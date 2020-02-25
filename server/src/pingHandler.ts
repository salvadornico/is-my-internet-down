import Koa from "koa"

export const handlePing: (ctx: Koa.ParameterizedContext) => void = ctx => {
	console.log(ctx.request.body)
	ctx.body = JSON.stringify(ctx.request.body)
}
