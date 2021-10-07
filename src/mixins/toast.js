export const toast = {
    methods:{
        makeToast(context, append = false, title, toastMessage, autoHideDelay, variant) {
            context.$bvToast.toast(toastMessage, {
                title: title ? title : 'Toast title',
                autoHideDelay: autoHideDelay ? autoHideDelay : 5000,
                appendToast: append,
                variant: variant
            })
        }
    }
}