<template>
    <div class="mz__loading mask">
        <div class="mz__loading--item">
                <div class="mz__loading--success"></div>
                <i v-if="icon !== ''" class="mz__loading--icon" :class="icon"></i>
                <img v-else-if="img !== ''" :src="img" alt="" />
                <div v-else class="mz__loading--loader"></div>
                <p class="mz__loading--text">
                    {{ message }}
                </p>
                <!-- <slot></slot> -->
        </div>
    </div>
</template>
<script>
export default {
  name: 'MZLoading',
  props: {
  },
  data() {
    return {
      icon: '',
      img: '',
      message: '',
    }
  }
}
</script>
