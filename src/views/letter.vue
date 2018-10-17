<template>
    <div class="span">
        <span>{{letters}}</span>
    </div>
</template>

<script>
export default {
    props: ['letters']
}
</script>

<style>
.sapn {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
}

.span>span {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    background: rgba(0, 0, 0, .4);
    width: 50px;
    height: 50px;
    display: inline-block;
    text-align: center;
    line-height: 50px;
    border-radius: 7px;
    color: #fff;
}
</style>
