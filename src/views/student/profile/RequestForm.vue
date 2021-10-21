<template>
  <div>
      <b-table bordered :items="departments" :fields="fields"></b-table>
  </div>
</template>

<script>
export default {
  data:()=>({
    fields:['in_charge',"department_name",'signature','status'],
  }),
  computed:{
    departments(){
      return this.$store.getters['studentRequestForm/getDepartments']
    }
  },
  mounted(){
    this.$store.dispatch('studentRequestForm/getDepartments', {searchString: ""})
  }
}
</script>

<style>

</style>