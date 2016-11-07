
import {SimpleChat} from 'meteor/cesarve:simple-chat/config'
SimpleChat.configure({
    beep: false,
    showViewed: true,
    showReceived: true,
    showJoined: true,
})
if (Meteor.isClient) {


    Template.home.events({
        'click button': function (e) {

            e.preventDefault()
            var roomId = $(e.target).val()
            var username = $("#username").val()
            if (!username) {
                if ($('.form-group').hasClass('has-error'))
                    return
                $('.form-group').addClass('has-error').append('<span class="help-block">Is required</span>')
                $('input').keyup(function () {
                    if ($(this).val() != '') {
                        $('.form-group').removeClass('has-error')
                        $('span').remove()
                    }
                })
                return
            }
            console.log(username, roomId)
            FlowRouter.go('room', {roomId}, {username})
        }
    });
    Template.home.helpers({
        'random': function () {
            return Random.id(5)
        }

    });

    Template.room.onRendered(function () {
        var self = this

        return Session.set('avatar', "/avatar" + (Math.floor(Math.random() * 5) + 1) + ".png")
/*
        HTTP.get('https://randomuser.me/api/', function (err, res) {
            console.log(err, res)
            if (err)
                return Session.set('avatar', "/avatar" + (Math.floor(Math.random() * 5) + 1) + ".png")

            Session.set('avatar', res.data.results[0].picture.thumbnail)
        })
*/


    })

    Template.room.helpers({
        'roomId': function () {
            return FlowRouter.getParam('roomId')
        },
        'username': function () {
            return FlowRouter.getQueryParam('username')
        },
        avatar: function () {
            return Session.get('avatar')
        }

    });


}

FlowRouter.route("/", {
    name: "home",
    action: function () {
        BlazeLayout.render("home");
    }
})
FlowRouter.route("/:roomId", {
    name: "room",
    action: function () {
        BlazeLayout.render('room')
    }
})
