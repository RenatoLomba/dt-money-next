import { ArrowCircleDown, ArrowCircleUp } from 'phosphor-react'
import { FC } from 'react'
import { Controller, useForm } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'

import { trpc } from '../../utils/trpc'
import {
  CreateTransactionInput,
  createTransactionSchema,
  MIN_PRICE_VALUE,
} from '../../utils/validations/create-transaction-schema'
import { Button } from '../button'
import { Input } from '../input'
import { TransactionType, TransactionTypeButton } from './styles'

export const CreateTransactionForm: FC = () => {
  const queryClient = trpc.useContext()
  const {
    register,
    formState: { errors },
    handleSubmit,
    control,
    reset,
  } = useForm<CreateTransactionInput>({
    resolver: zodResolver(createTransactionSchema),
  })

  const { mutate: createTransaction, isLoading } = trpc.useMutation(
    'auth.create-transaction',
    {
      onSuccess: () => {
        queryClient.invalidateQueries('auth.get-user-transactions')
        reset()
      },
    },
  )

  function onCreateTransactionFormSubmit(data: CreateTransactionInput) {
    createTransaction(data)
  }

  return (
    <form onSubmit={handleSubmit(onCreateTransactionFormSubmit)}>
      <div>
        <Input
          error={!!errors.description}
          type="text"
          placeholder="Descrição"
          {...register('description')}
        />

        {errors.description && (
          <small className="error-message">{errors.description.message}</small>
        )}
      </div>

      <div>
        <Input
          error={!!errors.value}
          type="number"
          placeholder="Preço"
          min={MIN_PRICE_VALUE}
          step=".01"
          {...register('value', { valueAsNumber: true })}
        />
        {errors.value && (
          <small className="error-message">
            {errors.value.type === 'invalid_type'
              ? 'Insira o valor da transação'
              : errors.value.message}
          </small>
        )}
      </div>

      <div>
        <Input
          error={!!errors.category}
          type="text"
          placeholder="Categoria"
          {...register('category')}
        />
        {errors.category && (
          <small className="error-message">{errors.category.message}</small>
        )}
      </div>

      <div>
        <Controller
          control={control}
          name="type"
          render={({ field: { onChange, value } }) => {
            return (
              <TransactionType value={value} onValueChange={onChange}>
                <TransactionTypeButton value="INPUT" variant="input">
                  <ArrowCircleUp size={32} />
                  <span>Entrada</span>
                </TransactionTypeButton>

                <TransactionTypeButton value="OUTPUT" variant="output">
                  <ArrowCircleDown size={32} />
                  <span>Saída</span>
                </TransactionTypeButton>
              </TransactionType>
            )
          }}
        />

        {errors.type &&
          (() => {
            const { type: errorType } = errors.type

            return (
              <small className="error-message">
                {errorType === 'invalid_type'
                  ? 'Indique o tipo de transação'
                  : errors.type.message}
              </small>
            )
          })()}
      </div>

      <Button disabled={isLoading} type="submit" size="lg" fullWidth>
        Cadastrar
      </Button>
    </form>
  )
}
