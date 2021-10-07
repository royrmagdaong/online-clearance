<template>
  <div>
    <div class="overflow-auto">
        <b-table
            id="my-table"
            :items="items"
            :per-page="perPage"
            :current-page="currentPage"
            bordered
            :fields="fields"
        ></b-table>
        <div class="d-flex justify-content-end flex-row">
            <b-pagination
                v-model="currentPage"
                :total-rows="rows"
                :per-page="perPage"
                aria-controls="my-table"
            ></b-pagination>
        </div>
    </div>
  </div>
</template>

<script>

export default {
    data:()=>({
        perPage: 15,
        currentPage: 1,
        items: [
          { id: 1, first_name: 'Fred', last_name: 'Flintstone', course: 'BSIT', year_level: '2nd' },
          { id: 2, first_name: 'Wilma', last_name: 'Flintstone', course: 'BSIT', year_level: '2nd' },
          { id: 3, first_name: 'Barney', last_name: 'Rubble', course: 'BSIT', year_level: '2nd' },
          { id: 4, first_name: 'Betty', last_name: 'Rubble', course: 'BSIT', year_level: '2nd' },
          { id: 5, first_name: 'Pebbles', last_name: 'Flintstone', course: 'BSIT', year_level: '2nd' },
          { id: 6, first_name: 'Bamm Bamm', last_name: 'Rubble', course: 'BSIT', year_level: '2nd' },
          { id: 7, first_name: 'The Great', last_name: 'Gazzoo', course: 'BSIT', year_level: '2nd' },
          { id: 8, first_name: 'Rockhead', last_name: 'Slate', course: 'BSIT', year_level: '2nd' },
          { id: 9, first_name: 'Pearl', last_name: 'Slaghoople', course: 'BSIT', year_level: '2nd' },
          { id: 1, first_name: 'Fred', last_name: 'Flintstone', course: 'BSIT', year_level: '2nd' },
          { id: 2, first_name: 'Wilma', last_name: 'Flintstone', course: 'BSIT', year_level: '2nd' },
          { id: 3, first_name: 'Barney', last_name: 'Rubble', course: 'BSIT', year_level: '2nd' },
          { id: 4, first_name: 'Betty', last_name: 'Rubble', course: 'BSIT', year_level: '2nd' },
          { id: 5, first_name: 'Pebbles', last_name: 'Flintstone', course: 'BSIT', year_level: '2nd' },
          { id: 6, first_name: 'Bamm Bamm', last_name: 'Rubble', course: 'BSIT', year_level: '2nd' },
          { id: 7, first_name: 'The Great', last_name: 'Gazzoo', course: 'BSIT', year_level: '2nd' },
          { id: 8, first_name: 'Rockhead', last_name: 'Slate', course: 'BSIT', year_level: '2nd' },
          { id: 9, first_name: 'Pearl', last_name: 'Slaghoople', course: 'BSIT', year_level: '2nd' }
        ],
        fields:['id', 'first_name', 'last_name', 'course', 'year_level']
    }),
    computed: {
      rows() {
        return this.items.length
      }
    }
}
</script>

<style scoped>
</style>