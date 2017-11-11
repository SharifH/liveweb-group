import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { Accounts } from 'meteor/accounts-base';
import Video from '../../api/video/video';


const users = [{
  email: 'admin@admin.com',
  password: 'password',
  profile: {
    name: { first: 'Carl', last: 'Winslow' },
  },
  roles: ['admin'],
}];

users.forEach(({ email, password, profile, roles }) => {
  const userExists = Meteor.users.findOne({ 'emails.address': email });

  if (!userExists) {
    const userId = Accounts.createUser({ email, password, profile });
    Roles.addUsersToRoles(userId, roles);
  }
});


let videoExists = Video.find().fetch();

console.log(videoExists.length);

if (!videoExists || videoExists.length === 0) {
  let docToInsert = {
    _id: '1',
    sessionOn: false,
  };
  Video.insert(docToInsert, {}, function(error, response){
    if (error) { console.log(error); return; }
     console.log('inserted');
  });

}
