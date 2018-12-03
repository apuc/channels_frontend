<template>
  <div class="chat-footer bg-light">
    <span class="chat-typing">
      <span v-if="usersTyping.length <= 2" v-for="user of usersTyping">{{ user.name }}{{usersTyping.length > 1 ? ', ': ' '}}</span>
      <span v-else>Несколько пользователей печатают...</span>
      <span v-if="usersTyping.length < 2 && usersTyping.length > 0">печатает</span>
      <span v-if="usersTyping.length > 1">печатают</span>
    </span>
    <b-input-group>
      <b-form-textarea id="input_message"
                       class="input_message"
                       v-model="input"
                       :placeholder="$ml.get('Chat.textareaPlaceholder')"
                       :rows="3"
                       :max-rows="5"
                       @input="emitUserTyping"
                       @keyup.enter.prevent.native="onSubmit">
      </b-form-textarea>
      <b-input-group-append>
        <b-btn @click="sendMessage(input, currentChannel.channel_id)" class="footer_sendBtn"
               variant="outline-success">{{$ml.get('Chat.btnSend')}}
        </b-btn>
      </b-input-group-append>
    </b-input-group>
  </div>
</template>

<script>
  import {ioTyping} from '../../services/socket/message.service'
  import {mapGetters, mapActions} from 'vuex'

  export default {
    computed: {
      ...mapGetters({
        currentChannel: 'channels/currentChannelData',
        userInfo: 'user/info',
        usersTyping: 'messages/usersTyping'
      })
    },
    data() {
      return {
        input: '',
        timeout: '',
      }
    },
    methods: {
      ...mapActions({
        SEND_MESSAGE: 'messages/SEND_MESSAGE'
      }),
      ioTyping,
      sendMessage(text, channelId) {
        this.SEND_MESSAGE({text, channelId});
        this.input = ''
      },
      onSubmit(event) {
        if (event.shiftKey) {
          event.preventDefault();
        } else {
          this.sendMessage(this.input, this.currentChannel.channel_id);
        }
      },
        emitUserTyping() {
        clearTimeout(this.timeout);
        ioTyping({
          user: {
            name: this.userInfo.username,
            id: this.userInfo.user_id
          },
          channelId: this.currentChannel.channel_id,
          isTyping: true
        });
        this.timeout = setTimeout(() => {
          ioTyping({
            user: {
              name: this.userInfo.username,
              id: this.userInfo.user_id
            },
            channelId: this.currentChannel.channel_id,
            isTyping: false
          });
        }, 2000);
      }
    }
  }
</script>

<style scoped>
  .chat-footer {
    padding: 20px;
    flex-shrink: 0;
  }

  .input_message {
    resize: none;
  }

  .footer_sendBtn {
    min-width: 100px;
    font-size: 18px;
  }
  .chat-typing {
    display: block;
    height: 15px;
    font-size: 15px;
    line-height: 1;
    color: #888;
  }
</style>