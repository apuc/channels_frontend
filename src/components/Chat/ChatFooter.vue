<template>
  <div class="chat-footer bg-light">

    <span class="chat-typing">
      <span v-if="usersTyping.length <= 2" v-for="user of usersTyping">{{ user.name }}{{usersTyping.length > 1 ? ', ': ' '}}</span>
      <span v-else>Несколько пользователей печатают...</span>
      <span v-if="usersTyping.length < 2 && usersTyping.length > 0">печатает</span>
      <span v-if="usersTyping.length > 1">печатают</span>
    </span>

    <div class="input_message-group">
      <label class="attach-file">
        <input type="file" multiple @change="ADD_ATTACHMENTS($event.target.files)">
        <v-icon scale="1.6" name="archive"/>
      </label>

      <b-form-textarea id="input_message"
                       class="input_message"
                       :rows="1"
                       :max-rows="3"
                       :placeholder="$ml.get('Chat.textareaPlaceholder')"
                       ref="textarea"
                       v-model="input"
                       @input="emitUserTyping"
                       @keyup.enter.prevent.native="onSubmit"
      >
      </b-form-textarea>

      <b-input-group-append class="input_message-button">
        <b-btn @click="sendMessage(input, currentChannel.id)" class="footer_sendBtn"
               variant="outline-success">{{$ml.get('Chat.btnSend')}}
        </b-btn>
      </b-input-group-append>
    </div>

    <div class="message-attachment">
      <Attachment v-for="(attachment, index) in attachments" :attachment="attachment" :key="index"/>
    </div>

  </div>
</template>

<script>
  import {ioTyping} from '../../services/socket/message.service'
  import {mapGetters, mapActions} from 'vuex'
  import Attachment from '../../components/Attachment/Attachment'

  export default {
    computed: {
      ...mapGetters('messages', ['usersTyping', 'attachments']),
      ...mapGetters({
        currentChannel: 'channels/currentChannelData',
        userInfo: 'user/userData',
      })
    },
    components: {Attachment},
    data() {
      return {
        input: '',
        timeout: '',
      }
    },
    methods: {
      ...mapActions('messages', ['SEND_MESSAGE', 'ADD_ATTACHMENTS']),
      ioTyping,
      sendMessage(text, channelId) {
        if (this.input.trim() !== '') {
          this.SEND_MESSAGE({text, channelId});
          this.input = ''
        }
      },
      onSubmit(event) {
        if (event.shiftKey) {
          event.preventDefault();
        } else {
          this.sendMessage(this.input, this.currentChannel.id);
        }
      },
      emitUserTyping() {
        clearTimeout(this.timeout);
        ioTyping({
          user: {
            name: this.userInfo.username,
            id: this.userInfo.user_id
          },
          channelId: this.currentChannel.id,
          isTyping: true
        });
        this.timeout = setTimeout(() => {
          ioTyping({
            user: {
              name: this.userInfo.username,
              id: this.userInfo.user_id
            },
            channelId: this.currentChannel.id,
            isTyping: false
          });
        }, 2000);
      },
    },
    mounted() {
      this.$refs.textarea.focus();
    }
  }
</script>

<style scoped>
  .chat-footer {
    padding: 20px;
    flex-shrink: 0;
  }

  .input_message-group {
    display: flex;
    align-items: flex-end;
  }

  .input_message {
    resize: none;
    min-height: 41px;
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

  .input_message-button {
    margin-left: 10px;
  }

  .attach-file {
    margin: 0 10px 0 0;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 41px;
    width: 40px;
    flex-shrink: 0;
    cursor: pointer;
    border: 1px solid #ccc;
    border-radius: 5px;
  }

  .attach-file input {
    display: none;
  }
</style>