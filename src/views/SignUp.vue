<template>
  <div class="container">
    <div class="row mt-5">
      <div class="col-1 col-md-3"></div>
      <div class="col-10 col-md-6">
        <div class="card shadow-sm py-2 px-3">
          <div class="card-body">
            <h4 class="card-title">Sign Up</h4>
            <form>
              <div class="form-group mb-2">
                <label for="exampleInputEmail1">Email address</label>
                <input type="email" class="form-control">
              </div>
              <div class="form-group mb-2">
                <label for="exampleInputPassword1">Password</label>
                <input type="password" class="form-control" >
              </div>
              <div class="form-group mb-2">
                <label for="exampleInputPassword1">Confirm Password</label>
                <input type="password" class="form-control">
              </div>
              <button type="submit" class="btn btn-primary" @click.prevent="">Submit</button>
            </form>
          </div>
        </div>
      </div>
      <div class="col-1 col-md-3"></div>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>