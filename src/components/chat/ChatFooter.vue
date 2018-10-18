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
                <b-btn @click="sendMessage(input, currentChannel)" class="footer_sendBtn"
                       variant="outline-success">{{$ml.get('Chat.btnSend')}}
                </b-btn>
            </b-input-group-append>
        </b-input-group>
    </div>
</template>

<script>
    import {sendMessage, typing} from '../../services/socket/message.service'
    import { io } from '../../services/socket/socket.service'
    import {mapGetters} from 'vuex'

    export default {
        computed: {
            ...mapGetters({
                currentChannel: 'channels/currentChannel',
            }),
        },
        data() {
            return {
                input: ''
            }
        },
        methods: {
            sendMessage,
            typing
        },
        mounted() {
            io.on('message', (data) => {
                console.log('message from socket ', data)
            })
        }
    }
</script>

<style scoped>
    .chat-footer {
        padding: 20px;
    }

    .input_message {
        resize: none;
    }

    .footer_sendBtn {
        min-width: 100px;
        font-size: 18px;
    }
</style>