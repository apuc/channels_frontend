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
            })
        },
        data() {
            return {
                input: ''
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