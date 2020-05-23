import { GraphQLResolveInfo } from 'graphql'
import { User, Post } from '@prisma/client'
import { GraphQLContext } from '@/graphql/types/context'
export type Maybe<T> = T | null
export type RequireFields<T, K extends keyof T> = {
  [X in Exclude<keyof T, K>]?: T[X]
} &
  { [P in K]-?: NonNullable<T[P]> }
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
}

export type Device = {
  __typename?: 'Device'
  id: Scalars['Int']
  userId: Scalars['Int']
  deviceId: Scalars['String']
  pushToken: Scalars['String']
}

export type Mutation = {
  __typename?: 'Mutation'
  addDevice?: Maybe<Device>
}

export type MutationAddDeviceArgs = {
  userId?: Maybe<Scalars['Int']>
  deviceId?: Maybe<Scalars['String']>
  pushToken?: Maybe<Scalars['String']>
}

export type PostLike = {
  __typename?: 'PostLike'
  userId?: Maybe<Scalars['Int']>
  postId?: Maybe<Scalars['Int']>
}

export type Query = {
  __typename?: 'Query'
  device?: Maybe<Device>
  post?: Maybe<Post>
  posts: Array<Maybe<Post>>
  user?: Maybe<User>
  users: Array<User>
}

export type QueryDeviceArgs = {
  userId?: Maybe<Scalars['Int']>
}

export type QueryPostArgs = {
  id?: Maybe<Scalars['Int']>
}

export type QueryUserArgs = {
  id?: Maybe<Scalars['Int']>
}

export type ResolverTypeWrapper<T> = Promise<T> | T

export type StitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>
}

export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>

export interface SubscriptionSubscriberObject<
  TResult,
  TKey extends string,
  TParent,
  TContext,
  TArgs
> {
  subscribe: SubscriptionSubscribeFn<
    { [key in TKey]: TResult },
    TParent,
    TContext,
    TArgs
  >
  resolve?: SubscriptionResolveFn<
    TResult,
    { [key in TKey]: TResult },
    TContext,
    TArgs
  >
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>
}

export type SubscriptionObject<
  TResult,
  TKey extends string,
  TParent,
  TContext,
  TArgs
> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>

export type SubscriptionResolver<
  TResult,
  TKey extends string,
  TParent = {},
  TContext = {},
  TArgs = {}
> =
  | ((
      ...args: any[]
    ) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>

export type isTypeOfResolverFn<T = {}> = (
  obj: T,
  info: GraphQLResolveInfo
) => boolean | Promise<boolean>

export type NextResolverFn<T> = () => Promise<T>

export type DirectiveResolverFn<
  TResult = {},
  TParent = {},
  TContext = {},
  TArgs = {}
> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Query: ResolverTypeWrapper<{}>
  Int: ResolverTypeWrapper<Scalars['Int']>
  Device: ResolverTypeWrapper<Device>
  String: ResolverTypeWrapper<Scalars['String']>
  Post: ResolverTypeWrapper<Post>
  User: ResolverTypeWrapper<User>
  Mutation: ResolverTypeWrapper<{}>
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>
  PostLike: ResolverTypeWrapper<PostLike>
}

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Query: {}
  Int: Scalars['Int']
  Device: Device
  String: Scalars['String']
  Post: Post
  User: User
  Mutation: {}
  Boolean: Scalars['Boolean']
  PostLike: PostLike
}

export type DeviceResolvers<
  ContextType = GraphQLContext,
  ParentType extends ResolversParentTypes['Device'] = ResolversParentTypes['Device']
> = {
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>
  userId?: Resolver<ResolversTypes['Int'], ParentType, ContextType>
  deviceId?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  pushToken?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  __isTypeOf?: isTypeOfResolverFn<ParentType>
}

export type MutationResolvers<
  ContextType = GraphQLContext,
  ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']
> = {
  addDevice?: Resolver<
    Maybe<ResolversTypes['Device']>,
    ParentType,
    ContextType,
    RequireFields<MutationAddDeviceArgs, never>
  >
}

export type PostResolvers<
  ContextType = GraphQLContext,
  ParentType extends ResolversParentTypes['Post'] = ResolversParentTypes['Post']
> = {
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>
  boardId?: Resolver<ResolversTypes['Int'], ParentType, ContextType>
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  body?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  userId?: Resolver<ResolversTypes['Int'], ParentType, ContextType>
  randomNickname?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  uploadedAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  editedAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  __isTypeOf?: isTypeOfResolverFn<ParentType>
}

export type PostLikeResolvers<
  ContextType = GraphQLContext,
  ParentType extends ResolversParentTypes['PostLike'] = ResolversParentTypes['PostLike']
> = {
  userId?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>
  postId?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>
  __isTypeOf?: isTypeOfResolverFn<ParentType>
}

export type QueryResolvers<
  ContextType = GraphQLContext,
  ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']
> = {
  device?: Resolver<
    Maybe<ResolversTypes['Device']>,
    ParentType,
    ContextType,
    RequireFields<QueryDeviceArgs, never>
  >
  post?: Resolver<
    Maybe<ResolversTypes['Post']>,
    ParentType,
    ContextType,
    RequireFields<QueryPostArgs, never>
  >
  posts?: Resolver<
    Array<Maybe<ResolversTypes['Post']>>,
    ParentType,
    ContextType
  >
  user?: Resolver<
    Maybe<ResolversTypes['User']>,
    ParentType,
    ContextType,
    RequireFields<QueryUserArgs, never>
  >
  users?: Resolver<Array<ResolversTypes['User']>, ParentType, ContextType>
}

export type UserResolvers<
  ContextType = GraphQLContext,
  ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']
> = {
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>
  portalId?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  password?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  nickname?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  randomNickname?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  registeredAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  posts?: Resolver<
    Maybe<Array<Maybe<ResolversTypes['Post']>>>,
    ParentType,
    ContextType
  >
  __isTypeOf?: isTypeOfResolverFn<ParentType>
}

export type Resolvers<ContextType = GraphQLContext> = {
  Device?: DeviceResolvers<ContextType>
  Mutation?: MutationResolvers<ContextType>
  Post?: PostResolvers<ContextType>
  PostLike?: PostLikeResolvers<ContextType>
  Query?: QueryResolvers<ContextType>
  User?: UserResolvers<ContextType>
}

/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = GraphQLContext> = Resolvers<ContextType>
