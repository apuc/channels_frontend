<template>
  <div class="chat-footer">

    <span class="chat-typing">
      <span v-if="usersTyping.length <= 2" v-for="user of usersTyping">{{ user.name }}{{usersTyping.length > 1 ? ', ': ' '}}</span>
      <span v-else>Несколько пользователей печатают...</span>
      <span v-if="usersTyping.length < 2 && usersTyping.length > 0">печатает</span>
      <span v-if="usersTyping.length > 1">печатают</span>
    </span>

    <div class="input_message-group">
      <div class="d-flex align-items-center mb-3 w-100">
        
        <b-form-textarea id="input_message"
                         class="input_message"
                         :rows="1"
                         :max-rows="3"
                         :placeholder="$ml.get('Chat.textareaPlaceholder')"
                         ref="textarea"
                         v-model="input"
                         @input="emitUserTyping"
                         @keyup.enter.prevent.native="onSubmit"
                         @paste.native="onPaste"
                        
        >
        </b-form-textarea>
        
        <div class='mobile_sendBtn-wrapper'>
        <button type="button"
                class="footer_sendBtn"
                @click="sendMessage(input, currentChannel.id)"
        >
          <img src="../../assets/img/send-button.svg" 
               alt=""
               width="15"
               height="15"
          >
        </button>
        <label class="attach-file--inside">
          <input type="file" multiple @change="addAttachments($event.target.files)">
          <img src="../../assets/img/add_folder.png" alt="">
        </label>
        </div>
      </div>

      <div class="message-attachment" v-scroll v-if="attachments">
        <Attachment v-for="(attachment, index) in attachments"
                    :key="index"
                    :attachment="attachment"
                    :deleteButton="true"
        />
      </div>

      <label class="attach-file">
        <div class="attach-file__tooltip">
          <div class="attach-file__option">
            <input id="attach-photo" type="file" accept="image/*" multiple @change="addAttachments($event.target.files)">
            <label for="attach-photo">Фото</label>
          </div>
          <div class="attach-file__option">
            <input id="attach-file" type="file" multiple @change="addAttachments($event.target.files)">
            <label for="attach-file">Файл</label>
          </div>
          <div class="attach-file__option" @click="SET_MODAL({name:'ModalMeetings'})">
            <label>Конференция</label>
          </div>
        </div>
        <img class="attach-file__icon" src="../../assets/img/add_folder.png" alt="">
      </label>

      <b-input-group-append class="input_message-button">
        <b-button @click="sendMessage(input, currentChannel.id)"
               variant="primary"
        >
          {{$ml.get('Chat.btnSend')}}
        </b-button>
      </b-input-group-append>
    </div>

    <div class="attachment-progress">
      <b-progress v-if="showProgress" :value="attachmentProgress" :max="100" show-progress animated></b-progress>
    </div>
  </div>
</template>

<script>
  import {ioTyping} from '../../services/socket/message.service';
  import {mapGetters, mapActions, mapMutations} from 'vuex';
  import { BFormTextarea, BInputGroupAppend, BProgress, BButton } from 'bootstrap-vue';
  import Attachment from '../../components/Attachment/Attachment';
  import {scroll} from '../../directives/scroll';

  export default {
    components: {BFormTextarea, BInputGroupAppend, BProgress, BButton, Attachment},
      
    directives: {
      scroll
    },
      
    data() {
      return {
        input: '',
        timeout: '',
        attachmentProgress:0,
      }
    },
      
    watch:{
      editMessage(message){
          if(message){
              this.input = message.text;
              return;
          }
          
          this.input = '';
      }
    },

    computed: {
      ...mapGetters('messages', ['usersTyping', 'attachments','editMessage']),
      ...mapGetters({
        currentChannel: 'channels/currentChannelData',
        userInfo: 'user/userData',
      }),

      showProgress() {
        if (this.attachmentProgress === 0 || this.attachmentProgress === 100) {
          return false;
        }

        return true;
      }
    },
      
    methods: {
      ...mapActions('messages', [
        'SEND_MESSAGE', 
        'ADD_ATTACHMENT', 
        'CLEAR_ATTACHMENTS',
        'EDIT_MESSAGE',
        'PARSE_LINK']
      ),
      ...mapMutations({
          SET_MODAL: 'modal/SET_MODAL',
      }),
        
      ioTyping,

        /**
         * Отправить сообщение
          * @param text
         * @param channelId
         */  
      sendMessage(text, channelId) {
          
        if(this.editMessage){
            this.EDIT_MESSAGE(this.input);
            return;
        }  
          
        if (this.input.trim() !== '' || this.attachments.length > 0) {
          this.SEND_MESSAGE({text, channelId});
          this.input = '';
          this.CLEAR_ATTACHMENTS();
        }
      },

        /**
         * Сабмит формы сообщения
         * @param event
         */
      onSubmit(event) {
        if (event.shiftKey) {
          event.preventDefault();
        } else {
          this.sendMessage(this.input, this.currentChannel.id);
          this.input = '';
          this.CLEAR_ATTACHMENTS();
        }
      },
      
      /**
       * Обработка вставки ссылок и картинок
       */ 
      onPaste(event){
        let item =  event.clipboardData.items[0];

        if(item.type.indexOf('image') !== -1){
          this.addAttachments([item.getAsFile()])
          return;
        }

        item.getAsString((data)=>{
          const youtubeId = this.getYoutubeId(data);
          if(data.includes(youtubeId)) {
            this.PARSE_LINK({text: data, youtubeId});
          } else {
            this.PARSE_LINK({ text: data });
          }
        })
         
      },
        
        /**
         * Пользователь печатает
         */
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
          this.PARSE_LINK({ text: this.input });
          
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

        /**
         * Добавить атачмент
         * @param files
         */
      async addAttachments(files) {
          for (let i = 0; i < files.length; i++) {
            await this.ADD_ATTACHMENT({attachment:files[i], onProgress: (e)=>{
                if (e.lengthComputable) {
                  this.attachmentProgress = e.loaded / e.total * 100;
                }
            }})
          }
      },

      getYoutubeId (url) {
        return this.$youtube.getIdFromUrl(url)
      }
    },
      
    mounted() {
      this.$refs.textarea.focus();
    }
  }
</script>

<style scoped lang='scss'>
  .chat-footer {
    padding: 20px;
    flex-shrink: 0;
  }

  .input_message-group {
    display: flex;
    align-items: flex-start;
    flex-wrap: wrap;
    position: relative;
    overflow: hidden;
  }

  .input_message {
    resize: none;
    min-height: 78px;
  }

  .footer_sendBtn {
    display: none;
    padding: 4px;

    font-size: 0;
    
    background-color: transparent;
    border: none;
  }

  .chat-typing {
    display: block;
    height: 15px;
    font-size: 15px;
    line-height: 1;
    color: #888;
  }

  .attach-file {
    position: relative;
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 40px;
    margin: 0 1.5rem;
    z-index: 100;

    cursor: pointer;

    &--inside {
      display: none;
    }

    &__tooltip {
      display: none;
    }

    &__option {
      padding: 0 1rem;
      &:hover {
        cursor: pointer;
        background-color: rgba(4, 35, 69, 0.15);
      }
    }

    &:hover {
      .attach-file__tooltip {
        cursor: pointer;
        height: 10rem;
        display: block;
        position: absolute;
        top:-90px;
        left: -80px;
        background-color: #fff;
        z-index: -1;
      }
    }
  }
  
  .attach-file_device {
    display: none;
  }

  .attachment-progress{
    padding-top: 10px;
    width: 200px;
  }

  .message-attachment {
    flex: 1 0 65%;
    display: flex;
    flex-wrap: wrap;
    max-height: 100px;
    overflow: auto;
    margin-right: 20px;
  }


  @media (max-width: 992px) {

    .mobile_sendBtn-wrapper {
      display: flex;
      flex-direction: column;

      .footer_sendBtn {
        display: initial;
      }
    }
    
    .input_message {
      margin-right: 20px;
    }

    .input_message-button {
      display: none;
    }
    .attach-file {
      display: none;

      &--inside {
        display: block;
                
        img {
          width: 20px;
          height: 20px;
        }
      }
    }

    .attach-file_device {
      display: flex;
      margin-bottom: 0;
    }
    
    .message-attachment {
      margin-right: 0;
    }
  }
  
  @media (max-width: 576px) {
    .chat-footer {
      padding: 7px;
    }
    
    .input_message {
      margin-right: 10px;
    }
  }

  @media screen and (max-width: 400px) {
    .attach-file--inside {
      top: 35px;
    }
  }
</style>