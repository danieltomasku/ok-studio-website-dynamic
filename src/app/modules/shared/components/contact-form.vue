<template>
	<div ref="modal" class="form-modal-wrapper">
		<div class="form-wrapper">
		<div class="close-form" @click="closeForm()">
			<svg xmlns="http://www.w3.org/2000/svg" fill="#ffffff" width="24" height="24" viewBox="0 0 24 24"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/><path d="M0 0h24v24H0z" fill="none"/></svg>
		</div>
		<!-- <form method="POST" action="https://formspree.io/inquire@workbyok.studio"> -->
		<form method="POST" name="contact-form" data-netlify="true" data-netlify-honeypot="bot-field">
			<input id="name" type="name" name="name">
			<label for="name">Name</label>
			<input id="email" type="email" name="email">
			<label for="email">Email</label>
			<textarea id="message" name="message"></textarea>
			<label for="message">Message</label>
			<button class="form-submit" type="submit">Submit</button>
			<input type="hidden" name="bot-field" />
			<input type="hidden" name="form-name" value="contact-form" />
		</form>
		</div>
	</div>
</template>

***********************************************************

<script>

export default
{
	"components": {},

	///////////////////////////////////////////////////////
	// 	...
	///////////////////////////////////////////////////////

	data ()
	{
		return {}
	},
	"props" : [""],
	"watch" : {},

	///////////////////////////////////////////////////////
	// 	...
	///////////////////////////////////////////////////////

	"mounted": function(){},
	"destroyed": function(){},

	///////////////////////////////////////////////////////
	// 	...
	///////////////////////////////////////////////////////

	"methods" : 
	{
		toggleForm(e) 
		{
			var overlay = this.$refs.modal;

			if (overlay.classList.contains('move')) {
				overlay.classList.remove('move');
			} else {
				overlay.classList.add('move');
			}

			document.body.classList.contains('lock-scroll') && !overlay.classList.contains('move') ? document.body.classList.remove('lock-scroll') : document.body.classList.add('lock-scroll');
		},

		closeForm ( event ) 
		{
			this.$refs.modal.classList.remove('move');
			document.body.classList.remove('lock-scroll');
		}
	},
	"computed" : {},
}
</script>

***********************************************************

<style lang="scss" scoped>
@import "~styles/_vars.scss";

///////////////////////////////////////////////////////////
// 	...
///////////////////////////////////////////////////////////

.form-modal-wrapper {
  width: 100vw;
  height: 100vh;
  color: black;
  position: fixed;
  top: 0;
  right: 0;
  z-index: 216;
  transition: transform 0.6s cubic-bezier(0.81, 0, 0.23, 0.99), opacity 1s;
  overflow: auto;
  transition: all .8s;
  opacity: 0;
  visibility: hidden;
}

.form-modal-wrapper.move {
  background-color: rgba(255, 255, 255, 0.95);
  transform: translateX(0vw) !important;
  opacity: 1 !important;
  visibility: visible !important;
}

.form-wrapper {
  width: 50vw;
  height: auto;
  padding: 48px;
  position: absolute;
  transform: translate(-50%, -50%);
  top: 50%;
  left: 50%;
  background-image: url('#{$path-images}/form-background.png');
  background-position: center center;
  background-size: cover;
}

.form-submit {
  display: block;
  border: 1px solid white;
  background-color: transparent;
  color: white;
  font-family: GTWalsheim-Light, sans-serif;
  padding: 12px 72px;
  text-transform: uppercase;
  font-size: 12px;
  margin: 35px auto 0;
  transition: background-color .3s ease-in-out, color .3s ease-in-out;
}

.form-submit:hover {
  background-color: white;
  color: black;
  cursor: pointer;
}

.close-form {
  display: inline-block;
  position: absolute;
  right: 30px;
  top: 30px;
}

.close-form:hover {
  cursor: pointer;
}

form {
  background-color: transparent;
  border: none;
  margin-top: 40px;
}

label {
  color: white;
  font-family: GTWalsheim, sans-serif;
  margin: 18px 0 50px 0;
  display: block;
}

textarea {
  display: block;
  margin: 35px 0 0 0px;
  width: 100%;
  height: 140px;
  background-color: transparent;
  border: 1px solid white;
  box-shadow: none;
  padding: 12px;
  color: white;
  font-family: GTWalsheim-Thin, sans-serif;
  font-size: 17px;
}

textarea:focus {
  outline: none;
}

input {
  background-color: transparent;
  border-radius: unset;
  border: none;
  border-bottom: 1px solid white;
  padding: 7px 0;
  width: 100%;
  color: white;
  font-family: GTWalsheim-Thin, sans-serif;
  font-size: 17px;
}

input:focus {
  outline: none;
  border-bottom: 1px solid white;
}


@include breakpoint( $bp-mobile ) {

	.form-wrapper {
      width: 100vw;
      height: 100%;
    }

    label {
      color: white;
      font-family: GTWalsheim, sans-serif;
      margin: 18px 0 40px 0;
      display: block;
    }
}


</style>