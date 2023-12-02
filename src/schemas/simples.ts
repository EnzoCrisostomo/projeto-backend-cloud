import { z } from "zod";

export const SearchSimplesParams = z.object({
  cnpjBasico: z.string().optional(),
  _offset: z.coerce.number().min(0, '_offset não pode ser menor que 0.').default(0),
  _size: z.coerce.number().min(1, '_size não pode ser menor que 1.').default(20),
});

export const SimplesEntity = z.object({
  id: z.coerce.number(),
  cnpj_basico: z.string().nullable(),
  opcao_simples: z.string().nullable(),
  data_opcao: z.string().nullable(),
  data_exclusao: z.string().nullable(),
  opcao_mei: z.string().nullable(),
  data_opcao_mei: z.string().nullable(),
  data_exclusao_mei: z.string().nullable(),
})

export const CreateSimplesEntity = SimplesEntity.omit({ id: true });
export const UpdateSimplesEntity = SimplesEntity.omit({ id: true }).partial();

export const SimplesEntityList = z.array(SimplesEntity.extend(
  { _total: z.bigint().min(BigInt(0)), }
));
