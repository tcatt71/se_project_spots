import "./index.css";
import {
  settings,
  toggleButtonState,
  handleInputValidation,
  enableValidation,
} from "../scripts/validation.js";
import Api from "../utils/Api.js";
import { API_KEY, BASE_URL } from "../utils/constants.js";

// const initialCards = [
//   {
//     name: "Golden Gate bridge",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/7-photo-by-griffin-wooldridge-from-pexels.jpg",
//   },
//   {
//     name: "Val Thorens",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/1-photo-by-moritz-feldmann-from-pexels.jpg",
//   },
//   {
//     name: "Restaurant terrace",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/2-photo-by-ceiline-from-pexels.jpg",
//   },
//   {
//     name: "An outdoor cafe",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/3-photo-by-tubanur-dogan-from-pexels.jpg",
//   },
//   {
//     name: "A very long bridge, over the forest and through the trees",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/4-photo-by-maurice-laschet-from-pexels.jpg",
//   },
//   {
//     name: "Tunnel with morning light",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/5-photo-by-van-anh-nguyen-from-pexels.jpg",
//   },
//   {
//     name: "Mountain house",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/6-photo-by-moritz-feldmann-from-pexels.jpg",
//   },
// ];

const modalList = document.querySelectorAll(".modal");

const profileAvatarImg = document.querySelector(".profile__avatar");
const profileTitleEl = document.querySelector(".profile__title");
const profileDescriptionEl = document.querySelector(".profile__description");
const profileTextBtn = document.querySelector(".profile__button_type_text");
const profileLargeBtn = document.querySelector(".profile__button_type_large");

const editProfileModal = document.querySelector("#edit-profile-modal");
const editProfileNameInput = editProfileModal.querySelector("#name");
const editProfileDescriptionInput =
  editProfileModal.querySelector("#description");
const editProfileForm = document.forms.namedItem("edit-profile-form");
const editProfileInputs = Array.from(
  editProfileForm.querySelectorAll(".form__input")
);
const editProfileSubmitBtn = editProfileForm.querySelector("[type='submit']");

const newPostModal = document.querySelector("#new-post-modal");
const newPostForm = document.forms.namedItem("new-post-form");
const newPostLinkInput = newPostModal.querySelector("#link");
const newPostCaptionInput = newPostModal.querySelector("#caption");
const newPostInputs = Array.from(newPostForm.querySelectorAll(".form__input"));
const newPostSubmitBtn = newPostModal.querySelector(".form__button_type_save");

const confirmationModal = document.querySelector("#confirmation-modal");

const cardListEl = document.querySelector(".cards__list");

const cardTemplate = cardListEl.querySelector("#card-template");

const closeButtons = document.querySelectorAll("[class*='close']");

const previewImageModal = document.querySelector("#preview-image-modal");
const previewImageDescription = previewImageModal.querySelector(
  ".modal__description"
);
const previewImageCardImage = previewImageModal.querySelector(".modal__image");

const api = new Api({
  baseUrl: BASE_URL,
  headers: {
    authorization: API_KEY,
    "Content-Type": "application/json",
  },
});

function setProfileContent(user) {
  profileTitleEl.textContent = user.name;
  profileDescriptionEl.textContent = user.about;
  profileAvatarImg.src = user.avatar;
}

api
  .getInitialCards()
  .then((cards) => cards.forEach((card) => renderCard(card, "append")))
  .catch((err) => console.error(err));

api
  .getUserInfo()
  .then((data) => setProfileContent(data))
  .catch((err) => console.error(err));

function openModal(modal) {
  modal.classList.add("modal_is-opened");
  document.addEventListener("keydown", escapeKeyExitModal);
}

function closeModal(modal) {
  modal.classList.remove("modal_is-opened");
  document.removeEventListener("keydown", escapeKeyExitModal);
}

function escapeKeyExitModal(evt) {
  const modal = document.querySelector(".modal_is-opened");

  if (evt.key === "Escape") closeModal(modal);
}

function getCardElement(data) {
  const cardElement = cardTemplate.content
    .querySelector(".card")
    .cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitleElement = cardElement.querySelector(".card__description");
  const likeBtn = cardElement.querySelector(".card__button_type_like");
  const deleteBtn = cardElement.querySelector(".card__button_type_delete");

  cardImage.src = data.link;
  cardImage.alt = data.name;
  cardTitleElement.textContent = data.name;

  likeBtn.addEventListener("click", () =>
    likeBtn.classList.toggle("card__button_liked")
  );
  deleteBtn.addEventListener("click", () =>
    confirmationModal.classList.add("modal_is-opened")
  );
  // deleteBtn.addEventListener("click", () => cardElement.remove());
  cardImage.addEventListener("click", () => {
    previewImageDescription.textContent = cardTitleElement.textContent;
    previewImageCardImage.src = cardImage.src;
    previewImageCardImage.alt = cardImage.alt;
    openModal(previewImageModal);
  });

  return cardElement;
}

function handleNewPostFormSubmit(evt) {
  evt.preventDefault();

  const formData = {
    name: newPostCaptionInput.value,
    link: newPostLinkInput.value,
  };

  api
    .addCard(formData)
    .then((cardData) => {
      console.log(cardData);
      const cardElement = getCardElement(cardData);
      cardListEl.prepend(cardElement);
    })
    .catch((err) => console.error(err));

  newPostForm.reset();
  toggleButtonState(editProfileInputs, editProfileSubmitBtn, settings);
  closeModal(newPostModal);
}

function updateTextElements(user) {
  profileTitleEl.textContent = user.name;
  profileDescriptionEl.textContent = user.about;
}

function handleEditProfileFormSubmit(evt) {
  evt.preventDefault();

  const formData = {
    name: editProfileNameInput.value,
    about: editProfileDescriptionInput.value,
  };

  api
    .editUserInfo(formData)
    .then((user) => updateTextElements(user))
    .catch((err) => console.error(err));

  closeModal(editProfileModal);
}

function renderCard(card, method) {
  const cardEl = getCardElement(card);
  cardListEl[method](cardEl);
}

newPostForm.addEventListener("submit", handleNewPostFormSubmit);
editProfileForm.addEventListener("submit", handleEditProfileFormSubmit);
profileTextBtn.addEventListener("click", () => {
  openModal(editProfileModal);
  editProfileNameInput.value = profileTitleEl.textContent;
  editProfileDescriptionInput.value = profileDescriptionEl.textContent;
  editProfileInputs.forEach((input) =>
    handleInputValidation(input, editProfileForm, settings)
  );
});
profileLargeBtn.addEventListener("click", () => {
  openModal(newPostModal);
  toggleButtonState(newPostInputs, newPostSubmitBtn, settings);
});

for (const button of closeButtons) {
  const parentModal = button.closest(".modal");

  button.addEventListener("click", () => closeModal(parentModal));
}

modalList.forEach((modal) => {
  modal.addEventListener("click", (evt) => {
    if (evt.target === evt.currentTarget) closeModal(modal);
  });
});

enableValidation(settings);
