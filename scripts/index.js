const initialCards = [
  {
    name: "Val Thorens",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/1-photo-by-moritz-feldmann-from-pexels.jpg",
  },
  {
    name: "Restaurant terrace",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/2-photo-by-ceiline-from-pexels.jpg",
  },
  {
    name: "An outdoor cafe",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/3-photo-by-tubanur-dogan-from-pexels.jpg",
  },
  {
    name: "A very long bridge, over the forest and through the trees",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/4-photo-by-maurice-laschet-from-pexels.jpg",
  },
  {
    name: "Tunnel with morning light",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/5-photo-by-van-anh-nguyen-from-pexels.jpg",
  },
  {
    name: "Mountain house",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/6-photo-by-moritz-feldmann-from-pexels.jpg",
  },
];

const profileTitleEl = document.querySelector(".profile__title");
const profileDescriptionEl = document.querySelector(".profile__description");
const profileTextBtn = document.querySelector(".profile__button_type_text");
const profileLargeBtn = document.querySelector(".profile__button_type_large");

const editProfileModal = document.querySelector("#edit-profile-modal");
const editProfileNameInput = editProfileModal.querySelector("#name");
const editProfileDescriptionInput =
  editProfileModal.querySelector("#description");
const editProfileForm = document.forms.namedItem("edit-profile-form");

const newPostModal = document.querySelector("#new-post-modal");
const newPostForm = document.forms.namedItem("new-post-form");
const newPostLinkInput = newPostModal.querySelector("#link");
const newPostNameInput = newPostModal.querySelector("#caption");

const closeButtons = document.querySelectorAll("[class$='button_type_close']");

const cardTemplate = document.querySelector("#card-template");

const cardListEl = document.querySelector(".cards__list");

function getCardElement(data) {
  const cardElement = cardTemplate.content
    .querySelector(".card")
    .cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitleElement = cardElement.querySelector(".card__description");
  const deleteBtn = cardElement.querySelector(".card__button_type_delete");

  cardImage.src = data.link;
  cardImage.alt = data.name;
  cardTitleElement.textContent = data.name;

  const likeBtn = cardElement.querySelector(".card__button_type_like");
  likeBtn.addEventListener("click", () => {
    likeBtn.classList.toggle("card__button_liked");
  });

  deleteBtn.addEventListener("click", () => {
    cardElement.remove();
  });

  return cardElement;
}

function openModal(modal) {
  modal.classList.add("modal_is-opened");
}

function closeModal(modal) {
  modal.classList.remove("modal_is-opened");
}

function handleNewPostFormSubmit(evt) {
  evt.preventDefault();
  const card = {
    link: newPostLinkInput.value,
    name: newPostNameInput.value,
  };
  const cardEl = getCardElement(card);
  cardListEl.prepend(cardEl);
  closeModal(newPostModal);
}

function handleEditProfileFormSubmit(evt) {
  evt.preventDefault();
  profileTitleEl.textContent = editProfileNameInput.value;
  profileDescriptionEl.textContent = editProfileDescriptionInput.value;
  closeModal(editProfileModal);
}

for (button of closeButtons) {
  const parentModal = button.closest(".modal");

  button.addEventListener("click", function () {
    closeModal(parentModal);
  });
}

newPostForm.addEventListener("submit", handleNewPostFormSubmit);
editProfileForm.addEventListener("submit", handleEditProfileFormSubmit);

profileTextBtn.addEventListener("click", function () {
  openModal(editProfileModal);
  editProfileNameInput.value = profileTitleEl.textContent;
  editProfileDescriptionInput.value = profileDescriptionEl.textContent;
});

profileLargeBtn.addEventListener("click", function () {
  openModal(newPostModal);
});

initialCards.forEach((card) => {
  const cardEl = getCardElement(card);
  cardListEl.append(cardEl);
});
