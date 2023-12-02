import { z } from "zod";

export const SearchEstabelecimentoParams = z.object({
  cnpjBasico: z.string().optional(),
  logradouro: z.string().optional(),
  email: z.string().optional(),
  _offset: z.coerce.number().min(0, '_offset não pode ser menor que 0.').default(0),
  _size: z.coerce.number().min(1, '_size não pode ser menor que 1.').default(20),
});

export const EstabelecimentoEntity = z.object({
  id: z.coerce.number(),
  cnpj_basico: z.string().nullable(),
  cnpj_ordem: z.string().nullable(),
  cnpj_dv: z.string().nullable(),
  identificador_matriz_filial: z.string().nullable(),
  situacao_cadastral: z.string().nullable(),
  data_situacao_cadastral: z.string().nullable(),
  motivo_situacao_cadastral: z.string().nullable(),
  nome_cidade_exterior: z.string().nullable(),
  pais: z.string().nullable(),
  data_inicio_atividade: z.string().nullable(),
  cnae_principal: z.string().nullable(),
  cnae_secundaria: z.string().nullable(),
  tipo_logradouro: z.string().nullable(),
  logradouro: z.string().nullable(),
  numero: z.string().nullable(),
  complemento: z.string().nullable(),
  bairro: z.string().nullable(),
  cep: z.string().nullable(),
  uf: z.string().nullable(),
  municipio: z.string().nullable(),
  ddd_1: z.string().nullable(),
  telefone_1: z.string().nullable(),
  ddd_2: z.string().nullable(),
  telefone_2: z.string().nullable(),
  ddd_fax: z.string().nullable(),
  fax: z.string().nullable(),
  email: z.string().nullable(),
  situacao_especial: z.string().nullable(),
  data_situacao_especial: z.string().nullable(),
})

export const EstabelecimentoEntityList = z.array(EstabelecimentoEntity.merge(
  z.object({ _total: z.bigint().min(BigInt(0)), })
));
