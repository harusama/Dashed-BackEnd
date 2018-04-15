class Users {
   constructor() {
      this.users = [];
      this.colors = ['#0D397F', '#1C77C8', '#BC0639', '#B95F21', '#1C4C56', '#EF4566'];
      this.lastColor = 0;
   }

   addUser(id, name, room) {
      const color = this.colors[this.lastColor];
      this.lastColor = (this.lastColor + 1) % this.colors.length

      const user = { id, name, room, color };
      this.users.push(user);
      return user;
   }

   removeUser(id) {
      const user = this.getUser(id);

      if (user) {
         this.users = this.users.filter(user => user.id != id);
      }

      return user;
   }

   getUser(id) {
      return this.users.filter(user => user.id === id)[0];
   }

   getUserList(room) {
      const users = this.users.filter(user => user.room === room);
      const names = users.map(user => user.name);
      
      return names;
   }
}

module.exports = { Users };