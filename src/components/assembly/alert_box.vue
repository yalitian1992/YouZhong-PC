<template>
	<div class="alert_box" v-if="alertShow">
				<div class="dialog_content">
						<h2 > {{alertText}}</h2><div><a class="action" @click.self="clonse">{{ $t('message.carts.yes') }}</a></div>
				</div>
		</div>
</template>

<script>
  import i18n from '../../assets/js/il8n'
  export default {
    i18n,
	 	props: ['alertText','alertShow'],
		    data(){
		      return {
		      }
		    },
		    methods: {
		     	clonse:function(){

		     		 this.$emit('clonse', false);
		     	}
		    }
		  }
</script>

<style>
	.alert_box{
		position: fixed;
		top: 0;
		width: 100%;
		height: 100%;
		background: rgba(0, 0, 0, 0.5);
    z-index:1000
	}
	.dialog_content {
		display: block;
	    width: 400px;
	    height: 100px;
	    background: #fff;
	    border-radius: 10px;
	    padding: 4em;
	    text-align: center;
	    position: absolute;
	    left: 600px;
	    top: 300px;
	    z-index: 50;
	    opacity: 1;
	}
	.action{
		margin-top: 80px;
		background: #BB1E7B;
		color: #fff;
		padding: 8px 12px;
		border-radius: 3px;
		cursor: pointer;
	}
</style>
