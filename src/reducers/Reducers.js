import {combineReducers} from 'redux';
import { createRewpa } from 'rewpa';

const paginationRewpa = createRewpa(
  { pageNow: null, pageTotal: null, countEachPage: null }
);

const photoRewpa = createRewpa(
  { id: '', photoUrl: '', isSaved: false, isLiked: false }
);

const tagRewpa = createRewpa(
  { id: '', tag: '' }
);

const equipmentRewpa = createRewpa(
  { id: '', equipment: ''}
);

const userRewpa = createRewpa(
  'User',
  { id: '', avatarUrl: '', isFollowing: false, tags: [tagRewpa], equipments: [equipmentRewpa] }
);

const locationRewpa = createRewpa(
  { id: '', lat: '', lng: ''}
);

const pinRewpa = createRewpa(
  { lat: '', lng: '' }
);

const blogRewpa = createRewpa(
  { id: '', author: userRewpa }
);

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
  (state, action, runActions) => {
    switch(action.type){
      case 'addTag':
        if(state.tags.map((e) => e.id).includes(action.payload.id)) return state;
        return runActions({ type: 'tags/__append', payload: action.payload });
      case 'deleteTag':
        return runActions({ type: 'tags/__remove', payload: (elem, index) => (elem.id == action.payload.id)});
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
    (state, action, runActions) => {
      switch(action.type){
        case 'set':
          return runActions(
            { type: 'pagination/__assign', payload: action.payload.pagination },
            { type: 'list/__append', payload: action.payload.newEntry }
          );
        default:
          return state;
      }
    }
  );
};

const userListRewpa = createRewpa('UserList', [userRewpa]);

const reducer = createRewpa({
  profile:                profileRewpa,
  profileInput:           profileInputRewpa,
  userFollowings:         createPaginationListRewpa(userRewpa),
  userFollowers:          createPaginationListRewpa(userRewpa),
  userSearchList:         userListRewpa,
  userSameTagList:        userListRewpa,
  userSameLocationList:   userListRewpa,
  userSameEquipmentList:  userListRewpa,
  photosSaved:            createPaginationListRewpa(photoRewpa),
  photosTaken:            createPaginationListRewpa(photoRewpa),
  locations:              [locationRewpa],
  pinList:                [pinRewpa],
  blogs:                  createPaginationListRewpa(blogRewpa),
  loading:                ''
},
(state, action, runActions) => {
  switch(action.type){
    case 'setFollowUser':
      return runActions({
        type: '..#UserList[?].isFollowing/__set',
        filter: (elem, index) => elem.id == action.payload.id,
        payload: action.payload.isFollowing
      });
    case 'setPhotoIsLiked':
      return runActions({
        type: 'photosSaved,photosTaken.list[?].isLiked/__set',
        filter: (elem) => elem.id == action.payload.id,
        payload: action.payload.isLiked
      });
    case 'setPhotoIsSaved':
      return runActions({
        type: 'photosSaved,photosTaken.list[?].isSaved/__set',
        filter: (elem) => elem.id == action.payload.id,
        payload: action.payload.isSaved
      });
    case 'deleteBlog':
      return runActions({
        type: 'blogs.list/__remove',
        payload: (elem) => elem.id == action.payload.id
      });
    default:
      return state;
  }
}
);

export default reducer;
