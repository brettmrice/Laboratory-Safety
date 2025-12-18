
  // adjust TOC scroll to selected element/topic
  function scroll_to_element() {
    header_height = document.getElementsByTagName('header')[0].offsetHeight/2;
    toc_element_position = document.querySelector('.book-toc > li > a.active').offsetTop;
    if(document.querySelector('.book-toc > li > a.active').offsetLeft == 0) {
      toc_element_position1 = document.querySelector('.book-toc > li > a.active').offsetParent.offsetTop;
      toc_element_position2 = document.querySelector('.book-toc > li > a.active').offsetParent.offsetHeight;
      toc_element_position = toc_element_position1 + toc_element_position2;
    }
    document.getElementsByTagName('header')[0].scrollTo(0, toc_element_position - header_height, 'smooth');
  }
  window.onload = scroll_to_element();

  // hide those labes that take up multiple lines
  sections = [];
  topics = [];
  stickys = [];
  function hide_label() {
    // sections
    document
      .querySelectorAll('.book-toc > li')
      .forEach(elem => {
        window
          .getComputedStyle(elem)
          .textTransform === "uppercase"
          &&
          elem.classList
          .contains('book-part')
          ? sections.push(elem)
          : '';
      });

    // topics
    document
      .querySelectorAll('.book-toc > li')
      .forEach(elem => {
        window
          .getComputedStyle(elem)
          .textTransform === "uppercase"
          &&
          !elem.classList
          .contains('book-part')
          ? topics.push(elem)
          : '';
      });

    // stickys
    document
      .querySelectorAll('.book-toc > li')
      .forEach(elem => {
        window
          .getComputedStyle(elem)
          .textTransform === "uppercase"
          &&
        window
          .getComputedStyle(elem)
          .position === "sticky"
          ? stickys.push(elem)
          : '';
      });
  }
  hide_label();
  head = document.getElementsByTagName('header')[0];
  head.addEventListener('scroll', () => {
    // sections
    count_sections = 0;
    prev_sections_elem = '';
    sections
      .forEach((elem) => {
      if(count_sections === 0) {
        initial_y = elem.getBoundingClientRect().y + 20;
        count_sections = 1;
      } else {
        if(elem.getBoundingClientRect().y < initial_y) {
          prev_sections_elem.classList.add('hide_label');
        } else {
          prev_sections_elem.classList.remove('hide_label');
        }
      }
      prev_sections_elem = elem;
    });
    // topics
    count_topics = 0;
    prev_topic_elem = '';
    topics
      .forEach((elem) => {
      if(count_topics === 0) {
        check_y = elem.getBoundingClientRect().y + elem.getBoundingClientRect().height;
        count_topics = 1;
      } else {
        if(elem.getBoundingClientRect().y < check_y) {
          prev_topic_elem.classList.add('hide_label');
          check_y = elem.getBoundingClientRect().y + elem.getBoundingClientRect().height;
        } else {
          prev_topic_elem.classList.remove('hide_label');
        }
      }
      prev_topic_elem = elem;
    });
    // stickys
    count_stickys = 0;
    prev_sticky_elem = '';
    sticky_height = '';
    sticky_top = '';
    stickys
      .forEach((elem) => {
        if(elem.classList.contains('book-part')) {
          sticky_height =
            elem
              .getBoundingClientRect().height;
          sticky_top =
            window
              .getComputedStyle(elem)
              .top.replace('px','');
        } else {
          if(sticky_height === '') {
            return;
          } else {
            elem.style.top = parseFloat(sticky_top) + sticky_height + 'px';
          }
        }
      });

  });

  // Previous/Next buttons
  document
    .querySelectorAll('.chapter-nav > div')
    .forEach(e => {
      if(e.classList.contains('prev')) {
        e.firstChild.innerText = 'Back'
      }
      if(e.classList.contains('next')) {
        e.firstChild.innerText = 'Next'
      }
    });
