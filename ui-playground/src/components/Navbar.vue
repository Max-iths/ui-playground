<template>
    <nav class="Navbar">
        <div >
            <router-link to="/" class="logo">
                UI-playground
            </router-link>
        </div>
            <ul class="navbar-links">
                <li>
                    <router-link to="/" class="navbar-link">
                        Home
                    </router-link>
                </li>
                <li>
                    <router-link to="/About" class="navbar-link">
                        About
                    </router-link>
                </li>
            </ul>
    </nav>
</template>

<script>
import { useRoute } from 'vue-router'

export default {
    name: 'Navbar',
    setup () {

    }
 }
</script>

<style scoped>
.Navbar {
    background-color: #90dfff;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px ;
    margin-top: 0;
}

.logo {
    font-size: 30px;
    font-weight: bold;
    padding: 10px;
    text-align: center;
    background-image: linear-gradient(to right, red, orange, yellow, green, blue, indigo, violet);
    -webkit-background-clip: text;
    background-clip: text;
    background-size: 400% 400%;
    color: transparent;
    display: inline-block;
    animation: gradientMove 5s linear infinite;
}

@keyframes gradientMove {
    0% {
        background-position: 0% 50%; /* Start at the left */
    }
    100% {
        background-position: 200% 50%; /* Move to the right continuously */
    }
}

.logo a {
    text-decoration: none;
}

.navbar-links {
    display: flex;
    list-style: none;
    align-items: center;
    padding: 10px;
    justify-content: center;
    margin: 10px 5px;
    gap: 10px;
    list-style: none;
    font-size: 18px;
}

.navbar-links li{
    list-style: none;
    text-decoration: none;
    display: flex;
}



.navbar-link:hover{
    color: white;
    transform: scale(1.15);
}

.navbar-link {
    text-decoration: none;
    transition: transform 0.5s ease, color 0.5s ease;
    padding: 5px 10px;
    color: black;
    font-size: 20px;
}

</style>
