if (Meteor.isClient) {


    Template.home.events({
        'click button': function (e) {
            e.preventDefault()
            var roomId=$(e.target).val()
            var username=$("#username").val()
            console.log(username,roomId)
            Router.go('room', {roomId: roomId}, {query: 'username=' + username})
        }
    });
    Template.home.helpers({
        'random': function () {
            return Random.id(5)
        }
    });
    Template.room.helpers({
        'roomId': function () {
            return Router.current().params.roomId
        },
        'username': function () {
            console.log('Router.current()', Router.current())
            return Router.current().params.query.username
        }
    });


}

Router.route("/", {
    name: "home",
    action: function () {
        this.render('home')
    }
})
Router.route("/:roomId", {
    name: "room",
    action: function () {
        this.render('room')
    }
})
