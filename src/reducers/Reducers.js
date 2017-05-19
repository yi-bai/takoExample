import {combineReducers} from 'redux';
import { createTako } from './Tako';

const paginationTako = createTako({
  pageNow: null,
  pageTotal: null,
  countEachPage: null
});

const photoTako = createTako(
{
  id: '',
  photoUrl: ''
});

const tagTako = createTako({
  id: '',
  tag: ''
});

const equipmentTako = createTako({
  id: '',
  equipment: ''
});

const userTako = createTako({
  id: '',
  avatarUrl: '',
  tags: [tagTako],
  equipments: [equipmentTako]
});

const locationTako = createTako({
  id: '',
  lat: '',
  lng: ''
});

const pinTako = createTako({
  lat: '',
  lng: ''
});

const blogTako = createTako({
  id: '',
  author: userTako
});

const profileTako = createTako(
{
  coverPhoto: photoTako,
  avatarUrl: '',
  firstName: '',
  lastName: '',
  country: '',
  aboutMe: '',
  countUserFollowing: 0,
  countUserFollower: 0,
  countPhotoSaved: 0,
  countPhotoUploaded: 0,
  countLocationTaken: 0,
  countLocationFollowing: 0,
  countPin: 0,
  countBlog: 0,
  tags: [tagTako],
  equipments: [equipmentTako],
  awards: ['']
}
);

const profileInputTako = createTako({
  coverPhotoId: null,
  tagSuggestions: [tagTako],
  equipmentSuggestions: [equipmentTako]
});

const createPaginationListTako = (tako) => {
  return createTako({
    pagination: paginationTako,
    list: [tako]
  });
};

const reducer = createTako({
  profile: profileTako,
  profileInput: profileInputTako,
  userFollowings: createPaginationListTako(userTako),
  userFollowers: createPaginationListTako(userTako),
  userSearchList: [userTako],
  userSameTagList: [userTako],
  userSameLocationList: [userTako],
  userSameEquipmentList: [userTako],
  photosSaved: createPaginationListTako(photoTako),
  photosTaken: createPaginationListTako(photoTako),
  locations: [locationTako],
  pinList: [pinTako],
  blogs: createPaginationListTako(blogTako),
  loading: ''
});

export default reducer;
