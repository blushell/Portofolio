<template>
	<div class="space-y-2 max-w-prose">
		<p>
			Hi there! I'm a full-stack developer and self-proclaimed bug whisperer
			who's been wrangling code since the tender age of 16. My coding journey
			began thanks to my amazing nana, who kickstarted my tech obsession by
			giving me my first computer—a Commodore 64—and later buying me my first
			laptop. She even roped me into creating a website for her grandparent-run
			RuneScape clan.<br />(Yes, my nana played RuneScape. And yes, she was
			awesome.)
		</p>
		<p>
			Now, at a seasoned 36, I've traded sleepless nights debugging for... well,
			more sleepless nights debugging (but with better snacks). When I'm not
			creating websites, tinkering with electronics, or Googling "why is my code
			broken," you'll find me spending time with my awesome wife and our dog
			<ImageLink :src="miloPath" alt="My dog Milo">Milo</ImageLink>—who is
			objectively the best coworker I’ve ever had (even if he sleeps through
			meetings).
		</p>
		<p>
			I also dabble in gaming, where I may be a bit older, but I still delight
			in schooling the younger generation. Nothing quite beats the sweet sound
			of a teenager yelling "hacker!" after I wipe the floor with them.
			Reflexes? Still sharp. Trash talk? Top-tier.
		</p>
		<p>
			If you’re into creative solutions, cool projects, or just want to chat
			about code, dogs, or legendary nanas, feel free to check out my GitHub or
			shoot me a message. Let’s make something awesome together! 🐾
		</p>
	</div>
</template>
<script setup>
import ImageLink from '../gallery/ImageLink.vue';
const config = useRuntimeConfig();
const baseURL = config.public.baseURL || '';

const miloPath = `${baseURL}/img/milo.jpg`;
</script>
