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

const profileTextBtn = document.querySelector(".profile__text-button");
const editProfileModal = document.querySelector("#edit-profile-modal");
const editProfileCloseBtn = editProfileModal.querySelector(
  ".form__button_type_close"
);

const profileLargeBtn = document.querySelector(".profile__large-button");
const newPostModal = document.querySelector("#new-post-modal");
const newPostCloseBtn = newPostModal.querySelector(".form__button_type_close");

const profileTitleEl = document.querySelector(".profile__title");
const editProfileNameInput = editProfileModal.querySelector("#name");

const profileDescriptionEl = document.querySelector(".profile__description");
const editProfileDescriptionInput =
  editProfileModal.querySelector("#description");

const editProfileForm = editProfileModal.querySelector(".form");

const newPostForm = newPostModal.querySelector(".form");
const newPostLinkInput = newPostModal.querySelector("#link");
const newPostNameInput = newPostModal.querySelector("#caption");

function handleNewPostFormSubmit(evt) {
  evt.preventDefault();
  console.log(newPostLinkInput.value);
  console.log(newPostNameInput.value);
  newPostModal.classList.remove("modal_is-opened");
}

function handleEditProfileFormSubmit(evt) {
  evt.preventDefault();
  profileTitleEl.textContent = editProfileNameInput.value;
  profileDescriptionEl.textContent = editProfileDescriptionInput.value;
  editProfileModal.classList.remove("modal_is-opened");
}

newPostForm.addEventListener("submit", handleNewPostFormSubmit);
editProfileForm.addEventListener("submit", handleEditProfileFormSubmit);

profileTextBtn.addEventListener("click", function () {
  editProfileModal.classList.add("modal_is-opened");
  editProfileNameInput.value = profileTitleEl.textContent;
  editProfileDescriptionInput.value = profileDescriptionEl.textContent;
});

editProfileCloseBtn.addEventListener("click", function () {
  editProfileModal.classList.remove("modal_is-opened");
});

profileLargeBtn.addEventListener("click", function () {
  newPostModal.classList.add("modal_is-opened");
});

newPostCloseBtn.addEventListener("click", function () {
  newPostModal.classList.remove("modal_is-opened");
});
