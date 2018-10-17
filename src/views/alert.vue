<template>
    <div>
        <div class="Dialog" v-if='isNone'>
            <div>
                <h4>{{msg}}</h4>
                <p @click="onClick">好</p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: ['msg', 'isNone'],
    methods: {
        onClick() {
            this.isNone = !this.isNone;
        }
    }
}
</script>

<style>
.Dialog {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, .5);
    z-index: 1000;
}

.Dialog div {
    width: 70%;
    height: 100px;
    background: #fff;
    position: fixed;
    top: 0;
    left: 0;
    left: 0;
    bottom: 0;
    margin-top: 75%;
    margin-left: 15%;
    border-radius: 10px;
}

.Dialog div h4 {
    font-weight: normal;
    line-height: 60px;
    text-align: center;
    font-size: 14px;
    border-bottom: 1px solid #ccc;
}

.Dialog div p {
    line-height: 40px;
    text-align: center;
    color: #3aacff;
    font-size: 16px;
}
</style>
