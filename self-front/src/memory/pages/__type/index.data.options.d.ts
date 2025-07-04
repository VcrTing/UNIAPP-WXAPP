
namespace Page {

    interface IndexDataActivityOption {
        tag: Tag
        pager: Pager
    }

    type IndexPageDataActivityOptions = { [k: string]: IndexDataActivityOption }
}