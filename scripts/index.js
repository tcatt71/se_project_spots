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
const profileTextBtn = document.querySelector(".profile__text-button");
const profileLargeBtn = document.querySelector(".profile__large-button");

const editProfileModal = document.querySelector("#edit-profile-modal");
const editProfileNameInput = editProfileModal.querySelector("#name");
const editProfileDescriptionInput =
  editProfileModal.querySelector("#description");
const editProfileForm = document.forms.namedItem("edit-profile-form");

const newPostModal = document.querySelector("#new-post-modal");
const newPostForm = document.forms.namedItem("new-post-form");
const newPostLinkInput = newPostModal.querySelector("#link");
const newPostNameInput = newPostModal.querySelector("#caption");

const closeButtons = document.querySelectorAll(".form__button_type_close");

function openModal(modal) {
  modal.classList.add("modal_is-opened");
}

function closeModal(modal) {
  modal.classList.remove("modal_is-opened");
}

function handleNewPostFormSubmit(evt) {
  evt.preventDefault();
  console.log(newPostLinkInput.value);
  console.log(newPostNameInput.value);
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

initialCards.forEach(function (card) {
  console.log(card.name);
});
