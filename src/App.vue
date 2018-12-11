<template>
  <div id="app" v-if="$route.name">
    <router-view v-if="$route.name === 'login'"/>
    <Layout v-else>
      <router-view/>
    </Layout>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import Layout from './components/Layout';
export default {
  components: {
    Layout
  },
  computed: {},
  methods: {}
};
</script>

