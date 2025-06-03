
namespace Page {

    interface IndexDataActivityOption {
        tag: ActivityTag
        pager: Pager
    }

    type IndexPageDataActivityOptions = { [k: string]: IndexDataActivityOption }
}