<template>
    <div class="chat-footer bg-light">
        <b-input-group>
            <b-form-textarea id="input_message"
                             class="input_message"
                             v-model="input"
                             :placeholder="$ml.get('Chat.textareaPlaceholder')"
                             :rows="3"
                             :max-rows="5">
            </b-form-textarea>
            <b-input-group-append>
                <b-btn @click="sendMessage(input, currentChannelId)" class="footer_sendBtn"
                       variant="outline-success">{{$ml.get('Chat.btnSend')}}
                </b-btn>
            </b-input-group-append>
        </b-input-group>
    </div>
</template>

<script>
    import {ioSendMessage, typing} from '../../services/socket/message.service'
    import {mapGetters} from 'vuex'

    export default {
        computed: {
            ...mapGetters({
                currentChannelId: 'channels/channelId',
            }),
        },
        data() {
            return {
                input: ''
            }
        },
        methods: {
            ioSendMessage,
            typing,
            sendMessage(msg, channelId) {
                ioSendMessage(msg, channelId);
                this.input = ''
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
</style>