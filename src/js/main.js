// Импортируйте наш пользовательский CSS
import "../scss/styles.scss";

// Импортируйте весь JS Bootstrap
import * as bootstrap from "bootstrap";

import { posts } from "../data/blog.db";

/*** SWITCHER LANG ***/

const handleSelectActiveElem = (element, selector) => {
  const container = document.querySelector(element);

  if (!container) return;
  const handleClick = (e) => {
    const target = e.target;

    // Проверяем, соответствует ли целевой элемент указанному селектору.
    if (!target.matches(selector)) {
      return;
    }

    // Если это ссылка (`<a>`) и у нее уже есть класс "active", ничего не делаем.

    if (target.tagName === "a" && target.classList.contains("active")) {
      return;
    }

    // Добавляем класс "active" к целевому элементу.
    target.classList.add("active");

    // Находим все элементы, соответствующие селектору, внутри контейнера.
    const otherElements = container.querySelectorAll(selector);
    // Убираем класс "active" у всех остальных элементов.
    otherElements.forEach((el) => {
      if (el !== target) {
        el.classList.remove("active");
      }
    });
  };

  container.addEventListener("click", (e) => {
    handleClick(e);
  });
};
// Добавляем обработчик события клика на контейнер.
handleSelectActiveElem(".switcher", "[data-lang]");
handleSelectActiveElem(".nav-horizontal .nav", "a");

/*** GET POSTS FOR BLOG ***/

const handleGetPosts = (elementsContainer) => {
  // Получение всех контейнеров для добавления постов
  const containers = document.querySelectorAll(elementsContainer);
  if (!containers || containers.length === 0) return;

  // Утилита для создания элемента с классами
  const createElement = (tag, classes = []) => {
    const element = document.createElement(tag);
    if (Array.isArray(classes)) {
      element.classList.add(...classes);
    } else {
      element.classList.add(classes);
    }
    return element;
  };

  // Функция для создания и добавления карточки поста в контейнер
  const createPostCard = (post, container) => {
    const { title, type, date, text } = post;

    // Блок с информацией о типе и дате
    const infoWrapper = createElement("div", [
      "d-flex",
      "justify-content-between",
      "info",
      "my-3",
    ]);

    const infoType = createElement("span", "info-item");
    infoType.textContent = type;

    const infoDate = createElement("span", "info-item");
    infoDate.textContent = date;

    infoWrapper.append(infoType, infoDate);
    container.appendChild(infoWrapper);

    // Заголовок поста
    const header = createElement("h5", ["card-title", "my-3"]);
    header.textContent = title;
    container.appendChild(header);

    // Описание поста
    const paragraph = createElement("p", ["card-text", "truncate-multiline"]);
    paragraph.textContent = text;
    container.appendChild(paragraph);
  };

  // Итерация по контейнерам и постам
  posts?.forEach((post, index) => {
    if (containers[index]) {
      createPostCard(post, containers[index]);
    }
  });
};

handleGetPosts("#blog .card-des");
handleGetPosts("#blog .card-mob");

/*** TOGGLE VISIBILITY PASSWORD ***/

const handleToggleVisPass = (elem, button) => {
  const input = document.querySelector(elem);
  const toggleBtn = document.querySelector(button);
  if (!input || !toggleBtn) return;

  const handleToggle = () => {
    console.log(input);
    if (input.type === "password") {
      input.type = "text";
      toggleBtn.textContent = "visibility_off";
    } else {
      input.type = "password";
      toggleBtn.textContent = "visibility";
    }
  };

  toggleBtn.addEventListener("click", handleToggle);
};

handleToggleVisPass("#exampleInputPassword1", ".toggle-vis-pass-des");
handleToggleVisPass("#exampleInputPassword2", ".toggle-vis-pass-mob");

/*** ADD BG FOR  HEADER TO SCROLL ***/

const handleAddBGHeader = () => {
  const header = document.querySelector("header");
  const image = header.querySelector("img");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      header.classList.add("custom-header-bg");
      image.style.display = "none";
    } else {
      header.classList.remove("custom-header-bg");
      image.style.display = "";
    }
  });
};

handleAddBGHeader();

/*** SIDEBAR ***/

const handleToggleSudibar = () => {
  const btnOpen = document.querySelector("header .bi");
  const btnClose = document.querySelector(".sidebar .material-icons");
  const sidebar = document.querySelector(".sidebar-wrapper");
  const links = document.querySelectorAll(".sidebar a");
  if (!btnOpen || !sidebar) return;
  const handleShowSidebar = () => {
    sidebar.classList.add("show");
    document.documentElement.style.overflow = "hidden";
  };
  const handleHideSidebar = () => {
    sidebar.classList.remove("show");
    document.documentElement.style.overflow = "";
  };

  links.forEach((link) => {
    link.addEventListener("click", handleHideSidebar);
  });

  btnOpen.addEventListener("click", handleShowSidebar);
  btnClose.addEventListener("click", handleHideSidebar);
};

handleToggleSudibar();
