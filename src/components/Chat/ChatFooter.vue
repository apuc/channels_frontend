<template>
  <div class="chat-footer">

    <span class="chat-typing">
      <span v-if="usersTyping.length <= 2" v-for="user of usersTyping">{{ user.name }}{{usersTyping.length > 1 ? ', ': ' '}}</span>
      <span v-else>Несколько пользователей печатают...</span>
      <span v-if="usersTyping.length < 2 && usersTyping.length > 0">печатает</span>
      <span v-if="usersTyping.length > 1">печатают</span>
    </span>

    <div class="input_message-group">
        
        <b-form-textarea id="input_message"
                         class="input_message"
                         :rows="1"
                         :max-rows="3"
                         :placeholder="$ml.get('Chat.textareaPlaceholder')"
                         ref="textarea"
                         v-model="input"
                         @input="emitUserTyping"
                         @keyup.enter.prevent.native="onSubmit"
                         @keydown.enter.exact.prevent=""
                         @paste.native="onPaste"
        >
        </b-form-textarea>


        
        <Smiles @selectSmile="addSmile($event)" @imgSmile="addImgSmile($event)"/>

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

		<div class="message-attachment" v-scroll v-if="attachments">
	        <Attachment v-for="(attachment, index) in attachments"
	                    :key="index"
	                    :attachment="attachment"
	                    :deleteButton="true"
	        />
      	</div>

	    <label class="attach-file">
	      <input type="file" multiple @change="addAttachments($event.target.files)">
	      <img src="../../assets/img/add_folder.png" alt="">
	    </label>

	    <b-input-group-append class="input_message-button">
	      <b-btn @click="sendMessage(input, currentChannel.id)"
	             variant="primary"
	      >
	        {{$ml.get('Chat.btnSend')}}
	      </b-btn>
	      </b-input-group-append>
      </div>
  </div>
</template>

<script>
  import {ioTyping} from '../../services/socket/message.service'
  import {mapGetters, mapActions} from 'vuex'
  import Attachment from '../../components/Attachment/Attachment'
  import Smiles from '../../components/Smiles/Smiles'
  import {scroll} from '../../directives/scroll';

  export default {
    computed: {
      ...mapGetters('messages', ['usersTyping', 'attachments','editMessage', 'smilesList']),
      ...mapGetters({
        currentChannel: 'channels/currentChannelData',
        userInfo: 'user/userData',
      }),
    },
      
    components: {Attachment, Smiles},
      
    directives: {
      scroll
    },
      
    data() {
      return {
        input: '',
        timeout: '',
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
      
    methods: {
      ...mapActions('messages', ['SEND_MESSAGE', 'ADD_ATTACHMENTS', 'CLEAR_ATTACHMENTS','EDIT_MESSAGE','PARSE_LINK']),
        
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

        if (this.input.trim() !== '' || this.attachments) {
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
        }
      },
      
      /**
       * Обработка вставки ссылок и картинок

       //------------
       		Картинки глючат. Нормально вставляется только print screen,
       		на прочие скопированные откуда-нибудь выбрасывает ошибку.
       		Также неадекватно работает drag&drop файлов (он не здесь, но так больше шансов, что заметят): 
       			Firefox - не пашет вообще;
       			chrome, Opera - срабатывает через раз, но при этом остаётся висеть drag&drop zone

       //------------
       */ 
      onPaste(event){
        let item =  event.clipboardData.items[0];
        
        if(item.type.indexOf('image') !== -1){
          this.addAttachments([item.getAsFile()]);
          return;
        }

        item.getAsString((data)=>{
          this.PARSE_LINK(data);
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
          this.PARSE_LINK(this.input);
          
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
      addAttachments(files) {
        this.ADD_ATTACHMENTS(files)
      },

      addSmile(e){
      	let posStart = this.$refs.textarea.selectionStart;
      	let posEnd = this.$refs.textarea.selectionEnd;
      	this.$refs.textarea.setRangeText(e, posStart, posEnd, "end");
        //т.к. без фокуса не обновляется input
        this.$refs.textarea.focus();
      },

      addImgSmile(e){

      }
    },
      
    mounted() {
      this.$refs.textarea.focus();
    }
  }
</script>

<style scoped lang="scss">
.chat-footer {
	padding: 20px;
	flex-shrink: 0;
}

.chat-typing {
	display: block;
	height: 15px;
	font-size: 15px;
	line-height: 1;
	color: #888;
}

.input{
	&_message-group{
		display: grid;
		grid-template-columns: minmax(55%, auto) repeat(3, min-content);
		grid-gap: 10px;
		& .message-attachment{
			grid-column: 1/2;
			grid-row: 2/3;
			display: flex;
			flex-wrap: wrap;
			max-height: 150px;
			overflow: auto;
			margin-right: 20px;
		}
	}
	&_message{
		grid-column: 1/-1;
		resize: none;
		min-height: 41px;
	}
	&_message-button{
		margin: 0 auto auto auto;
	}
}


.footer_sendBtn {
	display: none;
	padding: 4px;
	font-size: 0;
	background-color: transparent;
	border: none;
}

.attach-file {
	flex-shrink: 0;
	display: flex;
	align-items: center;
	justify-content: center;
	width: 40px;
	height: 40px;
	margin-right: 10px;
	cursor: pointer;
}

.attach-file_device {
	display: none;
}

.attach-file input {
	display: none;
}

.message-attachment {
	
}


@media (max-width: 992px) {
	.footer_sendBtn {
		display: initial;
	}

	.input_message-button,
	.attach-file {
		display: none;
	}

	.attach-file_device {
		display: flex;
		margin-bottom: 0;
	}

	.message-attachment {
		margin-right: 0;
	}

	.input{
		&_message-group{
			grid-template-columns: 1fr repeat(2, min-content);
			& .message-attachment{
				grid-column: 1/-1;
			}
			& .smiles{
				margin: auto;
			}
		}
		&_message{
			grid-column: 1/2;
		}
	}
}

@media (max-width: 576px) {
	.input_message-group{
		margin-right: 10px;
	}
	.chat-footer {
		padding: 7px;
	}
}


</style>