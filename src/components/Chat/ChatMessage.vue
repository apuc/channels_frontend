<template>
  <div class="message mb-1"
       :class="styleMessageAnother"
  >
    <div class="d-flex align-items-center">
      <router-link :to="`/user/${messageData.from.id}`" @click.native="GET_USER_DATA(messageData.from.id)">
        <img :src="userAvatar || noavatar"
             width="64"
             alt=""
             class="user-avatar"
        />
      </router-link>

      <h5 class="m-0 message-title">
        <router-link :to="`/user/${messageData.from.id}`" 
                     class="user-name"
                     @click.native="GET_USER_DATA(messageData.from.id)"
        >
          {{userName}}
        </router-link>
        <span class="message-time">{{ messageData['created_at'] }}</span>
        <img class="ml-3" v-if="messageData.from.id == userData.user_id"  @click.prevent="$refs.ctxMenu.open" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAARCAYAAAA7bUf6AAAACXBIWXMAAAsTAAALEwEAmpwYAAAF+mlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxNDIgNzkuMTYwOTI0LCAyMDE3LzA3LzEzLTAxOjA2OjM5ICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdEV2dD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlRXZlbnQjIiB4bWxuczpkYz0iaHR0cDovL3B1cmwub3JnL2RjL2VsZW1lbnRzLzEuMS8iIHhtbG5zOnBob3Rvc2hvcD0iaHR0cDovL25zLmFkb2JlLmNvbS9waG90b3Nob3AvMS4wLyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ0MgMjAxOCAoV2luZG93cykiIHhtcDpDcmVhdGVEYXRlPSIyMDE5LTA0LTI4VDEzOjM2OjIyKzAzOjAwIiB4bXA6TWV0YWRhdGFEYXRlPSIyMDE5LTA0LTI4VDEzOjM2OjIyKzAzOjAwIiB4bXA6TW9kaWZ5RGF0ZT0iMjAxOS0wNC0yOFQxMzozNjoyMiswMzowMCIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDphNzE5OTJlNy0yNTIyLWFmNGEtOGQwZS03YzI3NGU4NTkyNzgiIHhtcE1NOkRvY3VtZW50SUQ9ImFkb2JlOmRvY2lkOnBob3Rvc2hvcDo0Mjg1ZTYyYS03MWMyLTMxNGYtODUxZC1lYjgyNjRkZGM1NWMiIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDpkNGI0ZDIwNC0yZjM0LWZkNDEtYmM5NC05ZDIxNGE4NjAwMWEiIGRjOmZvcm1hdD0iaW1hZ2UvcG5nIiBwaG90b3Nob3A6Q29sb3JNb2RlPSIzIiBwaG90b3Nob3A6SUNDUHJvZmlsZT0ic1JHQiBJRUM2MTk2Ni0yLjEiPiA8eG1wTU06SGlzdG9yeT4gPHJkZjpTZXE+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJjcmVhdGVkIiBzdEV2dDppbnN0YW5jZUlEPSJ4bXAuaWlkOmQ0YjRkMjA0LTJmMzQtZmQ0MS1iYzk0LTlkMjE0YTg2MDAxYSIgc3RFdnQ6d2hlbj0iMjAxOS0wNC0yOFQxMzozNjoyMiswMzowMCIgc3RFdnQ6c29mdHdhcmVBZ2VudD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTggKFdpbmRvd3MpIi8+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJzYXZlZCIgc3RFdnQ6aW5zdGFuY2VJRD0ieG1wLmlpZDphNzE5OTJlNy0yNTIyLWFmNGEtOGQwZS03YzI3NGU4NTkyNzgiIHN0RXZ0OndoZW49IjIwMTktMDQtMjhUMTM6MzY6MjIrMDM6MDAiIHN0RXZ0OnNvZnR3YXJlQWdlbnQ9IkFkb2JlIFBob3Rvc2hvcCBDQyAyMDE4IChXaW5kb3dzKSIgc3RFdnQ6Y2hhbmdlZD0iLyIvPiA8L3JkZjpTZXE+IDwveG1wTU06SGlzdG9yeT4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4DDjfRAAAAyUlEQVQ4je3SoUvDURTF8c/7aRIMAxnYFhwIihg0zWI0DQYWWRhr+w/EsLBi1CwYhA1Msj/ALhi2vriyMET9C97KEx7DtrKwA5fD/cI9nHBDjNGqKlZO2IT8q1Bv9c7wgjKecRsE2I1iHzV84gY/6a6HDr7Q3jo8vRyjgh1cYIQJHtFMvIp9DHGFp8T30ChSg1zV5MdL/G8/WOKlAvcZmGGQVc7VTf6KacYftnGHj1TtLQi/UYR3nOAc4zQwxxGu8Y1h2Lz9GocsAJm4J+SSiaa8AAAAAElFTkSuQmCC" alt="">
        <img class="ml-3" v-else  @click.prevent="$refs.ctxMenuAnother.open" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAARCAYAAAA7bUf6AAAACXBIWXMAAAsTAAALEwEAmpwYAAAF+mlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxNDIgNzkuMTYwOTI0LCAyMDE3LzA3LzEzLTAxOjA2OjM5ICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdEV2dD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlRXZlbnQjIiB4bWxuczpkYz0iaHR0cDovL3B1cmwub3JnL2RjL2VsZW1lbnRzLzEuMS8iIHhtbG5zOnBob3Rvc2hvcD0iaHR0cDovL25zLmFkb2JlLmNvbS9waG90b3Nob3AvMS4wLyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ0MgMjAxOCAoV2luZG93cykiIHhtcDpDcmVhdGVEYXRlPSIyMDE5LTA0LTI4VDEzOjM2OjIyKzAzOjAwIiB4bXA6TWV0YWRhdGFEYXRlPSIyMDE5LTA0LTI4VDEzOjM2OjIyKzAzOjAwIiB4bXA6TW9kaWZ5RGF0ZT0iMjAxOS0wNC0yOFQxMzozNjoyMiswMzowMCIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDphNzE5OTJlNy0yNTIyLWFmNGEtOGQwZS03YzI3NGU4NTkyNzgiIHhtcE1NOkRvY3VtZW50SUQ9ImFkb2JlOmRvY2lkOnBob3Rvc2hvcDo0Mjg1ZTYyYS03MWMyLTMxNGYtODUxZC1lYjgyNjRkZGM1NWMiIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDpkNGI0ZDIwNC0yZjM0LWZkNDEtYmM5NC05ZDIxNGE4NjAwMWEiIGRjOmZvcm1hdD0iaW1hZ2UvcG5nIiBwaG90b3Nob3A6Q29sb3JNb2RlPSIzIiBwaG90b3Nob3A6SUNDUHJvZmlsZT0ic1JHQiBJRUM2MTk2Ni0yLjEiPiA8eG1wTU06SGlzdG9yeT4gPHJkZjpTZXE+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJjcmVhdGVkIiBzdEV2dDppbnN0YW5jZUlEPSJ4bXAuaWlkOmQ0YjRkMjA0LTJmMzQtZmQ0MS1iYzk0LTlkMjE0YTg2MDAxYSIgc3RFdnQ6d2hlbj0iMjAxOS0wNC0yOFQxMzozNjoyMiswMzowMCIgc3RFdnQ6c29mdHdhcmVBZ2VudD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTggKFdpbmRvd3MpIi8+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJzYXZlZCIgc3RFdnQ6aW5zdGFuY2VJRD0ieG1wLmlpZDphNzE5OTJlNy0yNTIyLWFmNGEtOGQwZS03YzI3NGU4NTkyNzgiIHN0RXZ0OndoZW49IjIwMTktMDQtMjhUMTM6MzY6MjIrMDM6MDAiIHN0RXZ0OnNvZnR3YXJlQWdlbnQ9IkFkb2JlIFBob3Rvc2hvcCBDQyAyMDE4IChXaW5kb3dzKSIgc3RFdnQ6Y2hhbmdlZD0iLyIvPiA8L3JkZjpTZXE+IDwveG1wTU06SGlzdG9yeT4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4DDjfRAAAAyUlEQVQ4je3SoUvDURTF8c/7aRIMAxnYFhwIihg0zWI0DQYWWRhr+w/EsLBi1CwYhA1Msj/ALhi2vriyMET9C97KEx7DtrKwA5fD/cI9nHBDjNGqKlZO2IT8q1Bv9c7wgjKecRsE2I1iHzV84gY/6a6HDr7Q3jo8vRyjgh1cYIQJHtFMvIp9DHGFp8T30ChSg1zV5MdL/G8/WOKlAvcZmGGQVc7VTf6KacYftnGHj1TtLQi/UYR3nOAc4zQwxxGu8Y1h2Lz9GocsAJm4J+SSiaa8AAAAAElFTkSuQmCC" alt="">
      </h5>
    </div>
    <p class="text">{{messageTemplates}}</p>
    <Attachment v-for="(attachment, index) in messageData.attachments"
                :key="index"
                :attachment="attachment"
                v-if="attachment"
                class="mb-1"
                :big="true"
    />

    <!-- Меню для владельца сообщения -->
    <context-menu id="context-menu" ref="ctxMenu">
      <li @click="SET_MESSAGE_TO_EDIT(messageData)">Редактировать</li>
      <li @click="deleteMessage(messageData.id)">Удалить</li>
      <li @click="replyMessage(messageData)">Ответить</li>
      <li @click="resendMessage(messageData)">Переслать</li>
    </context-menu>

    <!-- Меню для чужого сообщения -->
    <context-menu id="context-menu-another" ref="ctxMenuAnother">
      <li @click="replyMessage(messageData)">Ответить</li>
      <li @click="resendMessage(messageData)">Переслать</li>
    </context-menu>
  </div>
</template>

<script>
  import {mapGetters, mapActions,mapMutations} from 'vuex';
  import Attachment from '../Attachment/Attachment';
  import contextMenu from 'vue-context-menu'
  import {formatBytes} from "../../services/common.service";

  export default {
    components: {Attachment,contextMenu},
      
    props: {
      messageData: {
          
        from: {
          avatar: String,
          id: Number,
          username: Number
        },
          
        channel: Number,
        attachments: Array,
        created_at: String,
        id: Number,
        read: Number,
        text: String,
        to: String
      }
    },
      
    computed: {
      ...mapGetters({
        currentChannelUsers: 'channels/currentChannelUsers',
        userData: 'user/userData',
      }),
        
      user() {
        if (this.currentChannelUsers) {
          return this.currentChannelUsers.find(user => user.user_id === this.messageData.from.id);
        }
      },
      
      messageTemplates(){
        return this.messageData.text 
          ? this.messageData.text.replace('{{username}}',this.userData.username)
          : '';
      },
        
      userName() {
        if (this.user) {
          return this.user.username;
        }
      },
        
      userAvatar() {
        if (this.user) {
          return this.user.avatar ? this.user.avatar.small : this.noavatar;
        }
      },
        
      styleMessageAnother() {
        if (this.messageData) {
          return this.messageData.from.id === this.userData.user_id ? 'message_another align-self-end' : '';
        }
      },
    },
      
    data() {
      return {
        noavatar: 'data:image/gif;base64,R0lGODdhMAAwAPAAAAAAAP///ywAAAAAMAAwAAAC8IyPqcvt3wCcDkiLc7C0qwyGHhSWpjQu5yqmCYsapyuvUUlvONmOZtfzgFzByTB10QgxOR0TqBQejhRNzOfkVJ+5YiUqrXF5Y5lKh/DeuNcP5yLWGsEbtLiOSpa/TPg7JpJHxyendzWTBfX0cxOnKPjgBzi4diinWGdkF8kjdfnycQZXZeYGejmJlZeGl9i2icVqaNVailT6F5iJ90m6mvuTS4OK05M0vDk0Q4XUtwvKOzrcd3iq9uisF81M1OIcR7lEewwcLp7tuNNkM3uNna3F2JQFo97Vriy/Xl4/f1cf5VWzXyym7PHhhx4dbgYKAAA7'
      }
    },
      
    
    methods: {
      ...mapActions({
        GET_USER_DATA: 'user/GET_USER_DATA',
        DELETE_MESSAGE: 'messages/DELETE_MESSAGE',
      }),

        ...mapMutations({
            SET_MESSAGE_TO_EDIT: 'messages/SET_MESSAGE_TO_EDIT',
            ADD_ATTACHMENT: 'messages/ADD_ATTACHMENT',
            CLEAR_ATTACHMENTS: 'messages/CLEAR_ATTACHMENTS',
            SET_MODAL: 'modal/SET_MODAL',
        }), 
        
      deleteMessage(id){
          this.DELETE_MESSAGE(id);
      },
      
      replyMessage(message){
        
        const attachment = {
          type:'reply',
          options: {
            text:`"${message.text}"`,
            from:message.from.username,
            created:message.created_at,
          }
        };
        
        this.CLEAR_ATTACHMENTS();
        this.ADD_ATTACHMENT(attachment);
      },
      
      resendMessage(message){
        this.SET_MODAL({name:'ModalResendMessages',message:message});
      }
    }
  }
</script>

<style scoped>
  @import  '~vue-context/dist/css/vue-context.css';
  
  .message {
    max-width: 80%;
    padding: 7px;

    background-color: rgba(18, 80, 146, 0.1);
    border-radius: 10px;
  }
  
  .message_another {
    background-color: rgba(4, 35, 69, 0.15);
  }

  .text {
    font-family: sans-serif;
    width: 100%;
    padding: 7px;
    padding-left: 0;
    white-space: pre-line;
    word-break: break-all;
    margin: 0;
  }

  .message-title {
    display: flex;
    align-items: flex-end;
    width: 100%;
  }

  .message-time {
    flex: 1 0 auto;
    font-size: 12px;
    line-height: 1;
  }

  .user-avatar {
    width: 30px;
    height: 30px;
    margin-right: 10px;

    border-radius: 50%;
  }
  
  .user-name {
    margin-right: 10px;
    
    font-size: 14px;
    font-weight: 700;
    line-height: 1;
    color: rgba(16, 52, 146, 0.75);
  }

  @media (max-width: 768px) {
    .message {
      width: 80%;
    }
    
    .message-title {
      display: flex;
      justify-content: space-between;
    }
  }

  @media (max-width: 576px) {
    .message {
      width: 100%;
      max-width: 100%;
    }
  }
  
  .ctx-menu li{
    padding: 5px;
    cursor: pointer;
  }
</style>
