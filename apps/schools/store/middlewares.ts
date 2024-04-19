import { isRejected, Middleware, MiddlewareAPI } from '@reduxjs/toolkit'
import { message } from 'antd'
import router from 'next/router'
import { AppRoutes, RoutePath } from '@domains/common/constants/routerEnums'

interface ErrorCodes {
    [status: number]: string | { [code: string]: string }
}

const errorCodes: ErrorCodes = {
    400: {
        ValidationError: 'Ошибка валидации данных',
        ParseError: 'Ошибка разбора запроса',
        InvalidArgument: 'Некорректный аргумент',
        QueryCorrupted: 'Объект поврежден',
        WrongStatusChange: 'Неверное изменение статуса',
        EmailServiceUnavailable: 'Сервис отправки электронной почты недоступен',
        AlreadyExists: 'Объект с такими параметрами уже существует',
        MapServiceUnavailable: 'Сервис карт недоступен',
    },
    401: 'Вы не аутентифицированы. Пожалуйста, выполните вход для доступа к запрашиваемому ресурсу',
    403: 'Недостаточно прав для выполнения операции. Обратитесь к администратору для получения необходимых разрешений',
    404: 'Объект не найден. Пожалуйста, убедитесь, что указанный ресурс существует и повторите запрос',
    429: 'Слишком много попыток. Пожалуйста, подождите некоторое время и повторите запрос позже',
}

interface Action {
    type: string
    payload: {
        status: number
        data: {
            error: {
                code: string
            }
        }
    }
}

export const rtkQueryErrorLogger: Middleware = (api: MiddlewareAPI) => (next) => (action: Action) => {
    if (router.pathname === RoutePath[AppRoutes.MOBILE_RECAPTCHA]) return next(action)

    if (isRejected()(action)) {
        const { status, data } = action.payload // TODO: if some query or mutation is invalid it will fail on this line. We should think is it ok.
        const errorData = data && data.error
        const errorType = errorCodes[status]

        typeof errorType === 'string'
            ? message.error(errorType)
            : errorData?.code && message.error(errorType?.[errorData.code])
    }
    return next(action)
}
