<template>
	<div class="smiles" :class="{open: smile}">

      	<button class="smiles_button" @click="smile=!smile">
	      	<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
				 viewBox="0 0 40.9 41.5" xml:space="preserve">
				<g>
					<path d="M20.5,0C9.2,0,0,9.3,0,20.8s9.2,20.8,20.5,20.8c11.3,0,20.5-9.3,20.5-20.8S31.8,0,20.5,0z M20.5,39.8
						c-10.3,0-18.7-8.5-18.7-19c0-10.5,8.4-19,18.7-19c10.3,0,18.7,8.5,18.7,19C39.2,31.3,30.8,39.8,20.5,39.8z"/>
					<path d="M28.7,22.7c2.5,0,4.5-2,4.5-4.5c0-0.7-0.2-1.4-0.5-2c0,0.6-0.5,1.1-1.2,1.1c-0.7,0-1.2-0.5-1.2-1.2s0.5-1.2,1.2-1.2
						c0.1,0,0.2,0,0.3,0.1c-0.8-0.8-1.9-1.2-3.1-1.2c-2.5,0-4.5,2-4.5,4.5S26.2,22.7,28.7,22.7z"/>
					<path d="M12.3,22.7c2.5,0,4.5-2,4.5-4.5c0-0.7-0.2-1.4-0.5-2c0,0.6-0.5,1.1-1.2,1.1c-0.7,0-1.2-0.5-1.2-1.2S14.4,15,15,15
						c0.1,0,0.2,0,0.3,0.1c-0.8-0.8-1.9-1.2-3.1-1.2c-2.5,0-4.5,2-4.5,4.5S9.8,22.7,12.3,22.7z"/>
					<path d="M8.6,12.7c0.7,0.1,1.2-0.7,1.9-1.2c0.6-0.4,1.7-0.6,3.6,0.2c0.1,0,0.5-0.1,0.6-0.5c0.1-0.3,0-0.5-0.1-0.6
						c-0.4-0.8-2.6-1.3-4.6-0.5c-1.1,0.4-2.3,1.4-2.2,2C8,12.5,8.3,12.7,8.6,12.7z"/>
					<path d="M26.3,11.6c0.6,0.4,1.4-0.2,2.2-0.3c0.7-0.1,1.8,0.1,3.2,1.6c0.1,0,0.5,0.1,0.8-0.2c0.2-0.2,0.2-0.5,0.2-0.6
						c-0.1-0.9-2-2.2-4-2.2c-1.2,0-2.7,0.4-2.8,1C25.9,11.1,26.1,11.4,26.3,11.6z"/>
					<path d="M33.8,25.3c-0.3-0.1-0.6,0.2-0.7,0.5c-1.8,5.3-6.8,8.8-12.3,8.8c-5.6,0-10.7-3.6-12.4-9c-0.1-0.3-0.4-0.4-0.7-0.3
						c-0.2,0.1-0.4,0.3-0.3,0.6c1.8,5.9,7.2,9.9,13.3,10c6.2,0.1,11.8-4,13.6-10C34.3,25.7,34.1,25.4,33.8,25.3z"/>
				</g>
			</svg>
	    </button>

		<div class="smiles_list">

			<div class="smiles_list_angle">
			</div>

			<div class="smiles_list_wrapper">

			<b-tabs pills>
				<!--Вкладка "Смайлики"-->
				<b-tab title="Смайлы">
					<div class="smiles_list_wrapper_category"
						 v-for="item in smilesList">
							<p>{{item.title}}</p>
							<ul>
								<li v-for="smile in item.list" @click="clickSmile($event)">
									{{smile}}
								</li>
							</ul>
					</div>

				</b-tab>

				<!--Вкладка "Сnbrths"-->
				<b-tab title="Стикеры">
					<p>Зарезервировано под стикеры, анимации, ещё что-нибудь</p>
					<div class="smiles_list_wrapper_category"
						 v-for="item in smilesImgList">
							<p>{{item.title}}</p>
							<ul>
								<li v-for="source in item.list" @click="imgSmile($event)">
									<img :src="source" alt="">
								</li>
							</ul>
					</div>
				</b-tab>
			</b-tabs>
				
			</div>
		</div>
    </div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex';
export default {
    computed: {
		...mapGetters('smiles', ['smilesList', 'smilesImgList']),
	},
	data() {
      return {
        smile: false,
      }
    },
    methods: {
    	clickOutside(e) {
			if (!this.$el.contains(e.target)) {
				this.smile = false;
			}
		},
		clickSmile(e){
			this.$emit('selectSmile', e.target.innerText);
		},
		imgSmile(e){
			this.$emit('imgSmile', e.target.innerHTML);
		}
	},
	created() {
		document.addEventListener('click', this.clickOutside);
		this.$on('hook:beforeDestroy', () => document.removeEventListener('click', this.clickOutside));
	},
}
</script>

<style scoped lang="scss">
.smiles{
	position: relative;
  	&_button{
  		z-index: 5;
		margin: auto;
		padding: 0;
		display: flex;
		height: 40px;
		width: 40px;
		background-color: transparent;
		border: none;
		outline: none;
		border-radius: 50%;
		transition-duration: 0.2s;
		svg{
			margin: auto;
			width: 28px;
			height: 28px;
			fill: rgba(27, 99, 175, 0.3);
			transition-duration: 0.5s;
		}
		&:hover{
			svg{
				fill: rgba(27, 99, 175, 1);
			}
		}
		&:active{
			box-shadow: 0 0 5px 0 rgba(27, 99, 175, 0.5);
		}
	}
	&_list{
		z-index: 4;
		$padding: 3px;
		padding: $padding;
		position: absolute;
		top: -10px;
		left: 65px;
		width: 300px;
		border-radius: 10px;
		background-color: rgba(0, 123, 255, 0.2);
		transform: translate(-100%, calc(-100% + 10px));
		opacity: 0;
		visibility: hidden;
		transition-duration: 0.2s;
		transition-delay: 0.7s;
		&_angle{
			$borderWidth: 15px;
			position: absolute;
			top: calc(100% - 3px - 2px);//100% - padding - border (wrapper)
			right: 30px;
			width: 0;
			height: 0;
			border: $borderWidth solid transparent;
			border-top: $borderWidth solid rgba(0, 123, 255, 0.2);
			&:before{
				z-index: 5;
				content: "";
				position: absolute;
				left: 50%;
				top: 50%;
				display: block;
				width: 0;
				height: 0;
				border: $borderWidth solid transparent;
				border-top: $borderWidth solid rgba(0, 123, 255, 0.9);
				transform: translate(-50%, calc(-50% - #{$padding}));
			}
			&:after{
				z-index: 7;
				content: "";
				position: absolute;
				left: 50%;
				top: 50%;
				display: block;
				width: 0;
				height: 0;
				border: $borderWidth solid transparent;
				border-top: $borderWidth solid #fff;
				transform: translate(-50%, calc(-50% - #{$padding} - 2px));
			}
		}
		&_wrapper{
			z-index: 5;
			padding: 5px;
			position: relative;
			width: 100%;
			border: 2px solid rgba(0, 123, 255, 0.9);
			border-radius: 10px;
			background-color: #fff;
			& .tab-pane{
				padding: 5px;
			}
			&_category{
				>p{
					font-size: 14px;
					margin-bottom: 5px;
				}
				ul{
					padding: 0;
					list-style: none;
					display: flex;
					flex-direction: row;
					justify-content: flex-start;
					align-items: flex-start;
					flex-wrap: wrap;
					li{
						margin-right: 2px;
						margin-bottom: 5px;
						border-radius: 4px;
						transition-duration: 0.3s;
						font-size: 20px;
						cursor: pointer;
						&:hover{
							background-color: rgba(0, 123, 255, 0.2);
						}
					}
				}
			}
		}
	}
	&:hover{
		& .smiles_list{
			opacity: 1;
			visibility: visible;
			transform: translate(-100%, -100%);
			transition-delay: 0s;
		}
	}
	&.open{
		& .smiles_button{
			svg{
				fill: rgba(27, 99, 175, 1);
			}
		}
		& .smiles_list{
			opacity: 1;
			visibility: visible;
			transform: translate(-100%, -100%);
			transition-delay: 0s;
		}
		& .smiles_backdrop{
			opacity: 1;
			visibility: visible;
		}
	}
	@media(max-width: 768px){
		&_list{
			width: 90vw;
			max-width: 350px;
			&_wrapper{
				padding-bottom: 10px;
			}
		}
	}
}
</style>

<style lang="scss">
//Объединять нельзя, т.к. где-то прописаны глобальные стили для tabs
.smiles{
	&_list{
		&_wrapper{
			& .tabs{
				& .tab-content{
					max-height: 250px;
					min-height: 160px;
					overflow-y: auto;
				}
			}
		}
	}
	@media(max-width: 768px){
		&_list{
			&_wrapper{	
				& .nav{
					position: relative;
					box-shadow: none;
					background-color: initial;
				}
			}
		}
	}
}

</style>