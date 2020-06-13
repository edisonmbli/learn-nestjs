import { createParamDecorator, ExecutionContext } from "@nestjs/common";

export const ListOptions = createParamDecorator((data: string, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest();
    let { categories } = req.query;

    if (categories) {
        categories = categories.split('-');
    }

    return {
        categories
    }
}); 