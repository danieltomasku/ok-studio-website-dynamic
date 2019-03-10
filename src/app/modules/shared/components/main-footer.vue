<template>
    <footer class="wrapper pad-8-v">
    	<div class="container -fluid" v-if="content">
    		<div class="col-6 col-tablet-12 footer-column">
    			&copy; {{ currentYear }} OK Studio
    		</div>
    		<div class="col-3 col-tablet-12 footer-column">
				<span class="footer-column-label">Inquiries</span><br/>
    			<div class="">
    				<a class="footer-link-item">{{ content.contact_email }}</a>
    			</div>
    			<a class="footer-link-item" :href="'tel:' + content.contact_phone">T {{ content.contact_phone }}</a>
    		</div>
    		<div class="col-3 col-tablet-12 footer-column">
				<span class="footer-column-label">Follow</span><br/>
    			<div class="" v-for="item in content.social_links" :key="item.label">
    				<a
                        class="footer-link-item"
                        target="_blank"
                        rel="noopener"
                        :href="item.link.url"
                    >
                        {{ item.label }}
                    </a>
    			</div>
    			<div class="pad-2-top">
					<form method="POST" name="stay-updated" data-netlify="true" data-netlify-honeypot="bot-field">
						<input type="email" name="email" :placeholder="content.subscribe_text">
						<input type="submit" value="Send" style="display: none" />
						<input type="hidden" name="bot-field" />
						<input type="hidden" name="form-name" value="stay-updated" />
					</form>
    			</div>
    		</div>
    	</div>
	</footer>
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

	"methods" : {},

	// 
	"computed" : 
	{
		content () { return this.$store.state.footer; },
		currentYear() { return new Date().getFullYear(); }
	},
}
</script>

***********************************************************

<style lang="scss" scoped>
@import "~styles/_vars.scss";

///////////////////////////////////////////////////////////
// 	...
///////////////////////////////////////////////////////////

footer {
	position: relative;
	font-weight: 600;
	font-size: 14px;
	background-color: black;
	color: white;
	padding: 0 50px;

	@media (max-width: $bp-size-md) {
		padding: 0 25px;
	}
}

input {
	font-family: $font-family-base;
	background-color: transparent;
	border-radius: unset;
	border: none;
	border-bottom: 1px solid white;
	padding: 7px 0;
	width: 60%;
	color: white;
	font-size: 17px;
}

.wrapper
{
	a 
	{ 
		color: white; 
		text-decoration: none;
	}
}

a[href^="tel"] {
    color: inherit !important;
    text-decoration: none;
}

.footer-column {
    margin: 18px 0;
}

.footer-column-label {
	font-weight: 300;
	font-size: 22px;
	position: relative;
	display: block;
}

.footer-link-item {
	display: block;
	margin-bottom: 4px;
}

</style>