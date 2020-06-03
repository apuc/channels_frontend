<template>
  <div>
    <div class="drop" @dragover.prevent @drop="onDrop">
      <div class="helper"></div>
      <label v-if="!avatar || imgSrc ===null" class="button">
        Перетащите или выберите изображение
        <input type="file"
               name="image"
               @change="onChange"
               accept="image/jpeg,image/png"
        >
      </label>

      <div class="hidden image" v-else>

        <img :src="imgSrc"
             class="img"
             v-if="imgSrc"
        />

              <v-icon name="spinner"
                      scale="3"
                      spin
                      v-if="imgSrc ===''"
              />

        <button class="button button_remove"
                type="button"
                @click="removeImage"
        >
          Удалить
        </button>
      </div>
    </div>

    <span v-if="notImage" style="text-align: center; color: red;"> {{ notImage }}</span>
  </div>
</template>

<script>
    export default {
        name: "AvatarUploader",
        
        props:{
            avatar:{
                type:null,
                required:true,
            }
        },
        
        data(){
            return{
                imgSrc: '', //картинка
                notImage: '', //текст если выбрали картинку
            }
        },
        
        watch:{
            avatar(val){
               if(this.imgSrc === ''){
                   this.imgSrc = val.average;
               }
           }
        },
        
        created(){
           if(this.avatar){
               this.imgSrc = this.avatar.average; 
           }  
        },
        
        methods:{
            
            /**
             * Оборачивает картинку в форм дату и эмитит
             */
            createFormData(file) {
                let formData = new FormData();
                formData.append('avatar', file);
                this.$emit('input',formData);
            },

            /**
             * Обработка перетаскивания картинки
             */
            onDrop: function (e) {
                e.stopPropagation();
                e.preventDefault();
                const files = e.dataTransfer.files;
                this.createImage(files[0]);
                this.createFormData(files[0]);
            },

            /**
             * При изменении инпута с файлом
             * @param e
             */
            onChange(e) {
                this.imgSrc = '';
                
                const files = e.target.files || e.dataTransfer.files;
                const fileType = files[0].type.split('/');

                if (files.length && fileType[0] === 'image') {
                    this.notImage = '';
                    this.createImage(files[0]);
                    this.createFormData(files[0]);
                } else {
                    this.notImage = 'Выберите изображение, пожалуйста'
                }
            },

            /**
             * Задает срц картинки для отображаения аватара
             * @param file
             */
            createImage(file) {
                const reader = new FileReader();

                reader.onload = e => {
                    this.imgSrc = e.target.result;
                };
                reader.readAsDataURL(file);
            },

            /**
             * Удалить аву
             */
            removeImage() {
                this.imgSrc = null;
                this.$emit('input',null);
            },
        }
    }
</script>

<style scoped>
  .button {
    position: relative;
    padding: 15px 35px;

    font-weight: bold;
    color: #fff;

    background-color: #d3394c;
    border: 0;
    cursor: pointer;
  }

  .button:hover {
    background-color: #722040;
  }

  .button_remove {
    margin-top: 15px;
    padding: 10px 20px;
  }

  input[type="file"] {
    position: absolute;
    left: 0;
    z-index: -1;

    opacity: 0;
  }

  .hidden {
    display: none;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 100%;
  }

  .hidden.image {
    display: flex;
  }

  .img {
    width: 200px;
    height: 200px;
  }

  .drop {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    max-width: 600px;
    height: 100%;
    min-height: 100px;
    margin-bottom: 15px;

    border: 4px dashed #ccc;
    background-color: #f6f6f6;
    border-radius: 2px;
  }

  .drop label {
    margin-bottom: 0;
  }

  @media screen and (max-width: 400px) {
      .img {
        width: 100px;
        height: 100px;
      }
  }
</style>