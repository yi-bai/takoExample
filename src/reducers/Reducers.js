import {combineReducers} from 'redux';
import { createRewpa } from '../../../rewpa/src';

const paginationRewpa = createRewpa({ pageNow: null, pageTotal: null, countEachPage: null });
const photoRewpa = createRewpa({ id: '', photoUrl: '', isSaved: false, isLiked: false });
const tagRewpa = createRewpa({ id: '', tag: '' });
const equipmentRewpa = createRewpa({ id: '', equipment: ''});
const userRewpa = createRewpa({ id: '', avatarUrl: '', isFollowing: false, tags: [tagRewpa], equipments: [equipmentRewpa] });
const locationRewpa = createRewpa({ id: '', lat: '', lng: ''});
const pinRewpa = createRewpa({ lat: '', lng: '' });
const blogRewpa = createRewpa({ id: '', author: userRewpa });

const profileRewpa = createRewpa(
{
  coverPhoto: photoRewpa,
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
  tags: [tagRewpa],
  equipments: [equipmentRewpa],
  awards: ['']
},
(state, action, reduce) => {
  switch(action.type){
    case 'profile.addTag':
      if(state.tags.map((e) => e.id).includes(action.payload.id)) return state;
      return reduce({ path: 'tags', type: '__append', payload: action.payload });
    case 'profile.deleteTag':
      return reduce({ path: 'tags', type: '__remove', payload: (elem, index) => (elem.id == action.payload.id)});
    default:
      return state;
  }
}
);

const profileInputRewpa = createRewpa({
  coverPhotoId: null,
  tagSuggestions: [tagRewpa],
  equipmentSuggestions: [equipmentRewpa]
});

const createPaginationListRewpa = (Rewpa) => {
  return createRewpa(
    {
      pagination: paginationRewpa,
      list: [Rewpa]
    },
    (state, action, reduce) => {
      switch(action.type){
        case 'paginationList.set':
          state = reduce({ path: 'pagination', type: '__assign', payload: action.payload.pagination });
          state = reduce({ path: 'list', type: '__append', payload: action.payload.newEntry });
          return state;
        default:
          return state;
      }
    }
  );
};

const reducer = createRewpa({
  profile: profileRewpa,
  profileInput: profileInputRewpa,
  userFollowings: createPaginationListRewpa(userRewpa),
  userFollowers: createPaginationListRewpa(userRewpa),
  userSearchList: [userRewpa],
  userSameTagList: [userRewpa],
  userSameLocationList: [userRewpa],
  userSameEquipmentList: [userRewpa],
  photosSaved: createPaginationListRewpa(photoRewpa),
  photosTaken: createPaginationListRewpa(photoRewpa),
  locations: [locationRewpa],
  pinList: [pinRewpa],
  blogs: createPaginationListRewpa(blogRewpa),
  loading: ''
},
(state, action, reduce) => {
  switch(action.type){
    case 'setFollowUser':
      state = reduce({
        path: 'userSearchList,userSameTagList,userSameLocationList,userSameEquipmentList[?].isFollowing',
        filter: (elem, index) => elem.id == action.payload.id,
        type: '__set',
        payload: action.payload.isFollowing
      });
      return state;
    case 'setPhotoIsLiked':
      state = reduce({
        path: 'photosSaved,photosTaken.list[?].isLiked',
        filter: (elem) => elem.id == action.payload.id,
        type: '__set',
        payload: action.payload.isLiked
      });
      return state;
    case 'setPhotoIsSaved':
      state = reduce({
        path: 'photosSaved,photosTaken.list[?].isSaved',
        filter: (elem) => elem.id == action.payload.id,
        type: '__set',
        payload: action.payload.isSaved
      });
      return state;
    case 'deleteBlog':
      state = reduce({
        path: 'blogs.list',
        type: '__remove',
        payload: (elem) => elem.id == action.payload.id
      });
      return state;
    default:
      return state;
  }
}
);

export default reducer;
