import { createParamDecorator, ExecutionContext } from "@nestjs/common";

export const ListOptions = createParamDecorator((data: string, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest();
    let { categories, tags } = req.query;

    if (categories) {
        categories = categories.split('-');
    }

    if (tags) {
        tags = tags.split('-')
    }

    return {
        categories,
        tags
    }
}); 