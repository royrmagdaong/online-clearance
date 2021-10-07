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
          { status: 'active', id: 1, first_name: 'Fred', last_name: 'Flintstone', email: 'sample@gmail.com', is_verified: true, role: 'Admin', is_active: true },
          { status: 'active', id: 2, first_name: 'Wilma', last_name: 'Flintstone', email: 'sample@gmail.com', is_verified: true, role: 'Student', is_active: false },
          { status: 'inactive', id: 3, first_name: 'Barney', last_name: 'Rubble', email: 'sample@gmail.com', is_verified: true, role: 'Head department', is_active: true },
          { status: 'active', id: 4, first_name: 'Betty', last_name: 'Rubble', email: 'sample@gmail.com', is_verified: true, role: 'Student', is_active: true },
          { status: 'inactive', id: 5, first_name: 'Pebbles', last_name: 'Flintstone', email: 'sample@gmail.com', is_verified: true, role: 'Student', is_active: false },
          { status: 'active', id: 6, first_name: 'Bamm Bamm', last_name: 'Rubble', email: 'sample@gmail.com', is_verified: true, role: 'Student', is_active: true },
          { status: 'active', id: 7, first_name: 'The Great', last_name: 'Gazzoo', email: 'sample@gmail.com', is_verified: true, role: 'Student', is_active: true },
          { status: 'active', id: 8, first_name: 'Rockhead', last_name: 'Slate', email: 'sample@gmail.com', is_verified: true, role: 'Head department', is_active: true },
          { status: 'inactive', id: 9, first_name: 'Pearl', last_name: 'Slaghoople', email: 'sample@gmail.com', is_verified: true, role: 'Admin', is_active: true },
          { status: 'active', id: 1, first_name: 'Fred', last_name: 'Flintstone', email: 'sample@gmail.com', is_verified: true, role: 'Head department', is_active: true },
          { status: 'active', id: 2, first_name: 'Wilma', last_name: 'Flintstone', email: 'sample@gmail.com', is_verified: true, role: 'Head department', is_active: true },
          { status: 'inactive', id: 3, first_name: 'Barney', last_name: 'Rubble', email: 'sample@gmail.com', is_verified: true, role: 'Student', is_active: true },
          { status: 'active', id: 4, first_name: 'Betty', last_name: 'Rubble', email: 'sample@gmail.com', is_verified: true, role: 'Student', is_active: false },
          { status: 'inactive', id: 5, first_name: 'Pebbles', last_name: 'Flintstone', email: 'sample@gmail.com', is_verified: true, role: 'Student', is_active: true },
          { status: 'active', id: 6, first_name: 'Bamm Bamm', last_name: 'Rubble', email: 'sample@gmail.com', is_verified: true, role: 'Student', is_active: true },
          { status: 'active', id: 7, first_name: 'The Great', last_name: 'Gazzoo', email: 'sample@gmail.com', is_verified: true, role: 'Head department', is_active: true },
          { status: 'active', id: 8, first_name: 'Rockhead', last_name: 'Slate', email: 'sample@gmail.com', is_verified: true, role: 'Student', is_active: true },
          { status: 'inactive', id: 9, first_name: 'Pearl', last_name: 'Slaghoople', email: 'sample@gmail.com', is_verified: true, role: 'Head department', is_active: false }
        ],
        fields:['id', 'role', 'email','first_name', 'last_name', 'is_verified', 'is_active']
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