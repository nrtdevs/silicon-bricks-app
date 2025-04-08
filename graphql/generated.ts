import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTime: { input: any; output: any; }
  JSON: { input: any; output: any; }
};

export type AppPermissionsDto = {
  __typename?: 'AppPermissionsDto';
  appName: Scalars['String']['output'];
  modules: Array<PermissionGroupDto>;
};

export type ApplicationModule = {
  __typename?: 'ApplicationModule';
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  status: Scalars['String']['output'];
};

export type Breakdown = {
  __typename?: 'Breakdown';
  assignee?: Maybe<User>;
  assigneeId?: Maybe<Scalars['Float']['output']>;
  breakdownDate: Scalars['DateTime']['output'];
  breakdownDescription?: Maybe<Scalars['String']['output']>;
  breakdownLocation: Scalars['String']['output'];
  breakdownType?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  createdBy?: Maybe<User>;
  createdById?: Maybe<Scalars['Float']['output']>;
  id: Scalars['ID']['output'];
  latitude: Scalars['String']['output'];
  longitude: Scalars['String']['output'];
  media: Array<BreakdownMedia>;
  status: Scalars['String']['output'];
  statuses: Array<BreakdownStatus>;
  updatedAt: Scalars['DateTime']['output'];
  vehicle: Vehicle;
  vehicleId: Scalars['Int']['output'];
};

export type BreakdownMedia = {
  __typename?: 'BreakdownMedia';
  breakdown: Breakdown;
  breakdownId: Scalars['Int']['output'];
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  mediaType: Scalars['String']['output'];
  mediaUrl: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type BreakdownMediaDto = {
  breakdownId: Scalars['Float']['input'];
  mediaType?: InputMaybe<Scalars['String']['input']>;
  mediaUrl: Array<Scalars['String']['input']>;
};

export type BreakdownStatus = {
  __typename?: 'BreakdownStatus';
  approver?: Maybe<User>;
  approverId?: Maybe<Scalars['Float']['output']>;
  breakdown: Breakdown;
  breakdownId: Scalars['Int']['output'];
  createdAt: Scalars['DateTime']['output'];
  createdBy?: Maybe<User>;
  createdById?: Maybe<Scalars['Float']['output']>;
  id: Scalars['ID']['output'];
  remark: Scalars['String']['output'];
  status: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type BreakdownStatusDto = {
  approverId?: InputMaybe<Scalars['Float']['input']>;
  assignId?: InputMaybe<Scalars['Float']['input']>;
  id: Scalars['Float']['input'];
  remark: Scalars['String']['input'];
  status: Breakdown_Status;
};

export type Category = {
  __typename?: 'Category';
  createdAt: Scalars['DateTime']['output'];
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type ChangePasswordDto = {
  currentPassword: Scalars['String']['input'];
  email: Scalars['String']['input'];
  newPassword: Scalars['String']['input'];
};

export type Coupon = {
  __typename?: 'Coupon';
  couponCode: Scalars['String']['output'];
  description?: Maybe<Scalars['String']['output']>;
  discountType: Scalars['String']['output'];
  endDate: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  maxDiscountAmount: Scalars['Float']['output'];
  minOrderAmount: Scalars['Float']['output'];
  startDate: Scalars['DateTime']['output'];
  status: Scalars['String']['output'];
  usageLimit: Scalars['Float']['output'];
};

/** Coupon Status */
export enum CouponStatus {
  Active = 'active',
  Expired = 'expired',
  Inactive = 'inactive',
  Used = 'used'
}

export type CouponStatusDto = {
  id: Scalars['Float']['input'];
  status: CouponStatus;
};

export type CreateBreakdownDto = {
  breakdownDate: Scalars['String']['input'];
  breakdownDescription: Scalars['String']['input'];
  breakdownLocation: Scalars['String']['input'];
  breakdownType: Scalars['String']['input'];
  latitude: Scalars['String']['input'];
  longitude: Scalars['String']['input'];
  mediaUrl?: InputMaybe<Array<MediaDto>>;
  vehicleId: Scalars['Float']['input'];
};

export type CreateCouponDto = {
  couponCode: Scalars['String']['input'];
  description: Scalars['String']['input'];
  discountType: DiscountType;
  endDate: Scalars['String']['input'];
  maxDiscountAmount: Scalars['Float']['input'];
  minOrderAmount: Scalars['Float']['input'];
  startDate: Scalars['String']['input'];
  usageLimit: Scalars['Float']['input'];
};

export type CreateMeetingDto = {
  attendees?: InputMaybe<Array<Scalars['String']['input']>>;
  endTime: Scalars['String']['input'];
  meetingAgenda?: InputMaybe<Scalars['String']['input']>;
  meetingDate: Scalars['DateTime']['input'];
  meetingReference: Scalars['String']['input'];
  meetingTypeId?: InputMaybe<Scalars['Float']['input']>;
  meetingUrl?: InputMaybe<Scalars['String']['input']>;
  meetingVenueId?: InputMaybe<Scalars['Float']['input']>;
  parentMeetingId?: InputMaybe<Scalars['Float']['input']>;
  projectId?: InputMaybe<Scalars['Float']['input']>;
  startTime: Scalars['String']['input'];
  title?: InputMaybe<Scalars['String']['input']>;
  uploadDoc?: InputMaybe<Scalars['String']['input']>;
};

export type CreateMeetingTaskDto = {
  comment?: InputMaybe<Scalars['String']['input']>;
  completePercent: Scalars['Float']['input'];
  completedDate?: InputMaybe<Scalars['DateTime']['input']>;
  dueDate?: InputMaybe<Scalars['DateTime']['input']>;
  meetingId?: InputMaybe<Scalars['Float']['input']>;
  notesId?: InputMaybe<Scalars['Float']['input']>;
  openedDate?: InputMaybe<Scalars['DateTime']['input']>;
  priority: Scalars['String']['input'];
  projectId?: InputMaybe<Scalars['Float']['input']>;
  task?: InputMaybe<Scalars['String']['input']>;
};

export type CreateMeetingTypeDto = {
  name: Scalars['String']['input'];
};

export type CreateMeetingVenueDto = {
  address: Scalars['String']['input'];
  contactNumber: Scalars['Float']['input'];
  contactPerson: Scalars['String']['input'];
  description: Scalars['String']['input'];
  name: Scalars['String']['input'];
  title: Scalars['String']['input'];
};

export type CreateModuleDto = {
  description: Scalars['String']['input'];
  name: Scalars['String']['input'];
};

export type CreateNotesDto = {
  decision?: InputMaybe<Scalars['String']['input']>;
  meetingId?: InputMaybe<Scalars['Float']['input']>;
  notes?: InputMaybe<Scalars['String']['input']>;
  uploadDoc?: InputMaybe<Scalars['String']['input']>;
};

export type CreateOfferDto = {
  cashbackAmount: Scalars['Float']['input'];
  description: Scalars['String']['input'];
  discountType: DiscountType;
  discountValue: Scalars['Float']['input'];
  endDate: Scalars['String']['input'];
  maxDiscountAmount: Scalars['Float']['input'];
  minOrderAmount: Scalars['Float']['input'];
  offerType: OfferTypeStatus;
  startDate: Scalars['String']['input'];
  title: Scalars['String']['input'];
  usageLimit: Scalars['Float']['input'];
};

export type CreateOrganizationDto = {
  description: Scalars['String']['input'];
  name: Scalars['String']['input'];
};

export type CreatePackageDto = {
  description: Scalars['String']['input'];
  discountedPrice: Scalars['Float']['input'];
  moduleIds: Array<Scalars['Int']['input']>;
  name: Scalars['String']['input'];
  offerId?: InputMaybe<Scalars['Float']['input']>;
  price: Scalars['Float']['input'];
};

export type CreatePermissionDto = {
  action: Scalars['String']['input'];
  appName: AppName;
  description: Scalars['String']['input'];
  module: Scalars['String']['input'];
};

export type CreatePlanDto = {
  couponId: Scalars['Float']['input'];
  description: Scalars['String']['input'];
  discountedPrice: Scalars['Float']['input'];
  duration: Scalars['Float']['input'];
  name: Scalars['String']['input'];
  offerId: Scalars['Float']['input'];
  packageId: Scalars['Float']['input'];
  price: Scalars['Float']['input'];
};

export type CreateProjectDto = {
  description: Scalars['String']['input'];
  name: Scalars['String']['input'];
  organizationId: Scalars['Float']['input'];
};

export type CreateRoleDto = {
  description?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  permissionIds: Array<Scalars['Float']['input']>;
};

export type CreateSubscriptionDto = {
  duration: Scalars['Float']['input'];
  name: Scalars['String']['input'];
  planIds: Array<Scalars['Int']['input']>;
  price: Scalars['Float']['input'];
};

export type CreateUserDto = {
  avatar?: InputMaybe<Scalars['String']['input']>;
  email: Scalars['String']['input'];
  mobileNo: Scalars['Float']['input'];
  name: Scalars['String']['input'];
  roleIds: Array<Scalars['Int']['input']>;
  userType?: InputMaybe<UserType>;
};

export type CreateVehicleDto = {
  chassisNumber: Scalars['String']['input'];
  color: Scalars['String']['input'];
  insurance: Scalars['String']['input'];
  maintenanceHistory: Scalars['String']['input'];
  make: Scalars['String']['input'];
  model: Scalars['String']['input'];
  numberPlate: Scalars['String']['input'];
  year: Scalars['String']['input'];
};

export type CreateVehicleExpenseDto = {
  amount: Scalars['Float']['input'];
  breakDownId?: InputMaybe<Scalars['Float']['input']>;
  description: Scalars['String']['input'];
  expenseDate: Scalars['String']['input'];
  expenseType: Scalars['String']['input'];
  uploadDoc: Scalars['String']['input'];
  vehicleId: Scalars['Float']['input'];
};

export type CreateWarehouseDto = {
  capacity: Scalars['Float']['input'];
  contactPerson?: InputMaybe<Scalars['String']['input']>;
  email: Scalars['String']['input'];
  location: Scalars['String']['input'];
  name: Scalars['String']['input'];
  phone: Scalars['Float']['input'];
};

/** Custom Status */
export enum CustomStatus {
  Active = 'active',
  Blocked = 'blocked',
  Inactive = 'inactive',
  Pending = 'pending'
}

export type Dashboard = {
  __typename?: 'Dashboard';
  activeMeetings?: Maybe<Scalars['Int']['output']>;
  completedMeeting?: Maybe<Scalars['Int']['output']>;
  completedTasks?: Maybe<Scalars['Int']['output']>;
  inComingTasks?: Maybe<Scalars['Int']['output']>;
  inactiveMeetings?: Maybe<Scalars['Int']['output']>;
  ongoingTasks?: Maybe<Scalars['Int']['output']>;
  todayMeeting?: Maybe<Scalars['Int']['output']>;
  totalMeetings?: Maybe<Scalars['Int']['output']>;
  totalTasks?: Maybe<Scalars['Int']['output']>;
  upComingMeeting?: Maybe<Scalars['Int']['output']>;
};

export type DashboardCount = {
  __typename?: 'DashboardCount';
  assignedPermissionCount?: Maybe<Scalars['Int']['output']>;
  couponCount?: Maybe<Scalars['Int']['output']>;
  moduleCount?: Maybe<Scalars['Int']['output']>;
  offerCount?: Maybe<Scalars['Int']['output']>;
  organizationCount?: Maybe<Scalars['Int']['output']>;
  packageCount?: Maybe<Scalars['Int']['output']>;
  packageModuleCount?: Maybe<Scalars['Int']['output']>;
  permissionCount?: Maybe<Scalars['Int']['output']>;
  planCount?: Maybe<Scalars['Int']['output']>;
  projectCount?: Maybe<Scalars['Int']['output']>;
  roleCount?: Maybe<Scalars['Int']['output']>;
  subscriptionCount?: Maybe<Scalars['Int']['output']>;
  subscriptionPlanCount?: Maybe<Scalars['Int']['output']>;
  userCount?: Maybe<Scalars['Int']['output']>;
};

export type DashboardFilters = {
  endDate?: InputMaybe<Scalars['DateTime']['input']>;
  month?: InputMaybe<Scalars['Float']['input']>;
  startDate?: InputMaybe<Scalars['DateTime']['input']>;
  year?: InputMaybe<Scalars['String']['input']>;
};

/** Discount type for coupon */
export enum DiscountType {
  FixedAmount = 'FIXED_AMOUNT',
  Percentage = 'PERCENTAGE'
}

export type DynamicPermissionsDto = {
  __typename?: 'DynamicPermissionsDto';
  apps: Array<AppPermissionsDto>;
};

export type Group = {
  __typename?: 'Group';
  name: Scalars['String']['output'];
  permissions: Array<Permissions>;
};

export type Inventory = {
  __typename?: 'Inventory';
  batchNumber?: Maybe<Scalars['String']['output']>;
  currentStock: Scalars['Float']['output'];
  expiryDate?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['String']['output'];
  minStockLevel: Scalars['Float']['output'];
  openingStock: Scalars['Float']['output'];
  status: Scalars['String']['output'];
  warehouse: Warehouse;
};

export type ListInputDto = {
  filter?: InputMaybe<Scalars['JSON']['input']>;
  limit?: InputMaybe<Scalars['Float']['input']>;
  page?: InputMaybe<Scalars['Float']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  sortBy?: InputMaybe<Array<Array<Scalars['String']['input']>>>;
};

export type LoginRes = {
  __typename?: 'LoginRes';
  accessToken: Scalars['String']['output'];
  user: User;
};

export type Material = {
  __typename?: 'Material';
  barcode?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
  sku: Scalars['String']['output'];
  status: Scalars['String']['output'];
};

export type MediaDto = {
  mediaType: Scalars['String']['input'];
  url: Scalars['String']['input'];
};

export type Meeting = {
  __typename?: 'Meeting';
  attendees?: Maybe<Array<Scalars['String']['output']>>;
  createdAt: Scalars['DateTime']['output'];
  createdBy: User;
  createdByUserId: Scalars['ID']['output'];
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  endTime: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  meetingAgenda?: Maybe<Scalars['String']['output']>;
  meetingDate: Scalars['DateTime']['output'];
  meetingReference: Scalars['String']['output'];
  meetingType?: Maybe<MeetingType>;
  meetingTypeId?: Maybe<Scalars['Float']['output']>;
  meetingUrl?: Maybe<Scalars['String']['output']>;
  meetingVenue?: Maybe<MeetingVenue>;
  meetingVenueId?: Maybe<Scalars['Float']['output']>;
  parentMeetingId?: Maybe<Scalars['Float']['output']>;
  projectId?: Maybe<Scalars['Float']['output']>;
  startTime: Scalars['String']['output'];
  status: Scalars['String']['output'];
  title?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['DateTime']['output'];
  uploadDoc?: Maybe<Scalars['String']['output']>;
};

export type MeetingFiltersDto = {
  endDate?: InputMaybe<Scalars['DateTime']['input']>;
  startDate?: InputMaybe<Scalars['DateTime']['input']>;
};

/** Meeting  Status */
export enum MeetingStatus {
  Active = 'active',
  Completed = 'completed',
  Inactive = 'inactive'
}

export type MeetingStatusDto = {
  id: Scalars['Float']['input'];
  status: MeetingStatus;
};

export type MeetingTask = {
  __typename?: 'MeetingTask';
  comment?: Maybe<Scalars['String']['output']>;
  completePercent?: Maybe<Scalars['Float']['output']>;
  completedDate?: Maybe<Scalars['DateTime']['output']>;
  createdAt: Scalars['DateTime']['output'];
  createdByOwner: User;
  dueDate?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['ID']['output'];
  meetingId?: Maybe<Scalars['Float']['output']>;
  meetingTask?: Maybe<Meeting>;
  notesId?: Maybe<Scalars['Float']['output']>;
  notesTask?: Maybe<Notes>;
  openedDate?: Maybe<Scalars['DateTime']['output']>;
  ownerId?: Maybe<Scalars['Float']['output']>;
  priority: Scalars['String']['output'];
  projectId?: Maybe<Scalars['Float']['output']>;
  status: Scalars['String']['output'];
  task?: Maybe<Scalars['String']['output']>;
};

export type MeetingTaskFiltersDto = {
  endDate?: InputMaybe<Scalars['DateTime']['input']>;
  startDate?: InputMaybe<Scalars['DateTime']['input']>;
};

/** Meeting Task Status */
export enum MeetingTaskStatus {
  Approved = 'approved',
  Completed = 'completed',
  InProgress = 'in_progress',
  NotStarted = 'not_started',
  Rejected = 'rejected'
}

export type MeetingTaskStatusDto = {
  completePercent?: InputMaybe<Scalars['Float']['input']>;
  id: Scalars['Float']['input'];
  status: MeetingTaskStatus;
};

export type MeetingType = {
  __typename?: 'MeetingType';
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
};

export type MeetingVenue = {
  __typename?: 'MeetingVenue';
  address?: Maybe<Scalars['String']['output']>;
  contactNumber?: Maybe<Scalars['Float']['output']>;
  contactPerson?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  title?: Maybe<Scalars['String']['output']>;
};

export type Meta = {
  __typename?: 'Meta';
  currentPage: Scalars['Int']['output'];
  limit: Scalars['Int']['output'];
  totalItems: Scalars['Int']['output'];
  totalPages: Scalars['Int']['output'];
};

export type Module = {
  __typename?: 'Module';
  groups: Array<Group>;
  name: Scalars['String']['output'];
};

export type ModuleStatusDto = {
  id: Scalars['Float']['input'];
  status: CustomStatus;
};

export type Mutation = {
  __typename?: 'Mutation';
  addMediaToBreakdown: Array<BreakdownMedia>;
  assignModuleToPkg: Package;
  assignPermissionsToRole: Role;
  assignPlanToSubscription: Subscriptions;
  assignRoleToUser: User;
  changeBreakdownStatus: BreakdownStatus;
  changeCouponStatus: Coupon;
  changeModuleStatus: ApplicationModule;
  changeOfferStatus: Offer;
  changePackageStatus: Package;
  changePassword: Scalars['Boolean']['output'];
  changePlanStatus: Plan;
  changeSubscriptionStatus: Subscriptions;
  changeUserStatus: User;
  changeWarehouseStatus: Warehouse;
  createBreakdown: Breakdown;
  createCoupon: Coupon;
  createMeeting: Meeting;
  createMeetingTask: MeetingTask;
  createMeetingType: MeetingType;
  createMeetingVenue: MeetingVenue;
  createModule: ApplicationModule;
  createNotes: Array<Notes>;
  createOffer: Offer;
  createOrganization: Organization;
  createPackage: Package;
  createPermission: Permissions;
  createPlan: Plan;
  createProject: Project;
  createRole: Role;
  createSubscription: Subscriptions;
  createSubscriptionWithPlans: Subscriptions;
  createUser: User;
  createVehicle: Vehicle;
  createVehicleExpense: VehicleExpense;
  createWarehouse: Warehouse;
  deleteBreakdown: Scalars['Boolean']['output'];
  deleteCoupon: Scalars['Boolean']['output'];
  deleteMeting: Scalars['Boolean']['output'];
  deleteMetingTask: Scalars['Boolean']['output'];
  deleteMetingType: Scalars['Boolean']['output'];
  deleteMetingVenue: Scalars['Boolean']['output'];
  deleteModule: Scalars['Boolean']['output'];
  deleteNotes: Scalars['Boolean']['output'];
  deleteOffer: Scalars['Boolean']['output'];
  deleteOrganization: Scalars['Boolean']['output'];
  deletePackage: Scalars['Boolean']['output'];
  deletePermission: Scalars['Boolean']['output'];
  deletePlan: Scalars['Boolean']['output'];
  deleteProject: Scalars['Boolean']['output'];
  deleteRole: Scalars['Boolean']['output'];
  deleteSubscription: Scalars['Boolean']['output'];
  deleteUser: Scalars['Boolean']['output'];
  deleteVehicle: Scalars['Boolean']['output'];
  deleteVehicleExpense: Scalars['Boolean']['output'];
  deleteWarehouse: Scalars['Boolean']['output'];
  enableMeetingStatus: Meeting;
  enableMeetingTaskStatus: MeetingTask;
  enableOrganizationStatus: Organization;
  enableProjectStatus: Project;
  enableUserStatus: User;
  enableVehicleStatus: Vehicle;
  forgotPassword: Scalars['Boolean']['output'];
  hardDeleteCoupon: Scalars['Boolean']['output'];
  hardDeleteMeeting: Scalars['Boolean']['output'];
  hardDeleteMeetingTask: Scalars['Boolean']['output'];
  hardDeleteMeetingType: Scalars['Boolean']['output'];
  hardDeleteMeetingVenue: Scalars['Boolean']['output'];
  hardDeleteModule: Scalars['Boolean']['output'];
  hardDeleteNotes: Scalars['Boolean']['output'];
  hardDeleteOffer: Scalars['Boolean']['output'];
  hardDeleteOrganization: Scalars['Boolean']['output'];
  hardDeletePackage: Scalars['Boolean']['output'];
  hardDeletePlan: Scalars['Boolean']['output'];
  hardDeleteProject: Scalars['Boolean']['output'];
  hardDeleteRole: Scalars['Boolean']['output'];
  hardDeleteSubscription: Scalars['Boolean']['output'];
  hardDeleteUser: Scalars['Boolean']['output'];
  hardDeleteWarehouse: Scalars['Boolean']['output'];
  login: LoginRes;
  logout: Scalars['Boolean']['output'];
  register: User;
  requestOtp: OtpRes;
  resetPassword: Scalars['Boolean']['output'];
  restoreCoupon: Scalars['Boolean']['output'];
  restoreMeeting: Scalars['Boolean']['output'];
  restoreMeetingTask: Scalars['Boolean']['output'];
  restoreMeetingType: Scalars['Boolean']['output'];
  restoreMeetingVenue: Scalars['Boolean']['output'];
  restoreModule: Scalars['Boolean']['output'];
  restoreNotes: Scalars['Boolean']['output'];
  restoreOffer: Scalars['Boolean']['output'];
  restoreOrganization: Scalars['Boolean']['output'];
  restorePackage: Scalars['Boolean']['output'];
  restorePlan: Scalars['Boolean']['output'];
  restoreProject: Scalars['Boolean']['output'];
  restoreRole: Scalars['Boolean']['output'];
  restoreSubscription: Scalars['Boolean']['output'];
  restoreUser: Scalars['Boolean']['output'];
  restoreVehicle: Scalars['Boolean']['output'];
  restoreVehicleBreakdown: Scalars['Boolean']['output'];
  restoreVehicleExpense: Scalars['Boolean']['output'];
  restoreWarehouse: Scalars['Boolean']['output'];
  sendRegistrationOtp: OtpRes;
  updateBreakdown: Breakdown;
  updateCoupon: Coupon;
  updateMeeting: Meeting;
  updateMeetingTask: MeetingTask;
  updateMeetingTaskStatusByAdmin: MeetingTask;
  updateMeetingType: MeetingType;
  updateMeetingVenue: MeetingVenue;
  updateModule: ApplicationModule;
  updateNotes: Notes;
  updateOffer: Offer;
  updateOrganization: Organization;
  updatePackage: Package;
  updatePermission: Permissions;
  updatePlan: Plan;
  updateProfile: User;
  updateProject: Project;
  updateRole: Role;
  updateSubscription: Subscriptions;
  updateUser: User;
  updateVehicle: Vehicle;
  updateVehicleExpense: VehicleExpense;
  updateWarehouse: Warehouse;
};


export type MutationAddMediaToBreakdownArgs = {
  data: BreakdownMediaDto;
};


export type MutationAssignModuleToPkgArgs = {
  moduleIds: Array<Scalars['Int']['input']>;
  packageId: Scalars['Int']['input'];
};


export type MutationAssignPermissionsToRoleArgs = {
  permissionIds: Array<Scalars['Int']['input']>;
  roleId: Scalars['Int']['input'];
};


export type MutationAssignPlanToSubscriptionArgs = {
  SubscriptionId: Scalars['Int']['input'];
  planIds: Array<Scalars['Int']['input']>;
};


export type MutationAssignRoleToUserArgs = {
  roleIds: Array<Scalars['Int']['input']>;
  userId: Scalars['Int']['input'];
};


export type MutationChangeBreakdownStatusArgs = {
  data: BreakdownStatusDto;
};


export type MutationChangeCouponStatusArgs = {
  updateCouponStatusInput: CouponStatusDto;
};


export type MutationChangeModuleStatusArgs = {
  updateModuleStatusInput: ModuleStatusDto;
};


export type MutationChangeOfferStatusArgs = {
  updateOfferStatusInput: OfferStatusDto;
};


export type MutationChangePackageStatusArgs = {
  updatePackageStatusInput: PackageStatusDto;
};


export type MutationChangePasswordArgs = {
  changePasswordData: ChangePasswordDto;
};


export type MutationChangePlanStatusArgs = {
  updatePlanStatusInput: PlanStatusDto;
};


export type MutationChangeSubscriptionStatusArgs = {
  updateSubscriptionStatusInput: SubscriptionStatusDto;
};


export type MutationChangeUserStatusArgs = {
  data: UserStatusDto;
};


export type MutationChangeWarehouseStatusArgs = {
  data: WarehouseStatusDto;
};


export type MutationCreateBreakdownArgs = {
  data: CreateBreakdownDto;
};


export type MutationCreateCouponArgs = {
  createCouponInput: CreateCouponDto;
};


export type MutationCreateMeetingArgs = {
  data: CreateMeetingDto;
};


export type MutationCreateMeetingTaskArgs = {
  data: CreateMeetingTaskDto;
};


export type MutationCreateMeetingTypeArgs = {
  data: CreateMeetingTypeDto;
};


export type MutationCreateMeetingVenueArgs = {
  data: CreateMeetingVenueDto;
};


export type MutationCreateModuleArgs = {
  createModuleInput: CreateModuleDto;
};


export type MutationCreateNotesArgs = {
  notesData: Array<CreateNotesDto>;
};


export type MutationCreateOfferArgs = {
  createOfferInput: CreateOfferDto;
};


export type MutationCreateOrganizationArgs = {
  createOrganizationInput: CreateOrganizationDto;
};


export type MutationCreatePackageArgs = {
  createPackageInput: CreatePackageDto;
};


export type MutationCreatePermissionArgs = {
  data: CreatePermissionDto;
};


export type MutationCreatePlanArgs = {
  createPlanInput: CreatePlanDto;
};


export type MutationCreateProjectArgs = {
  createProjectInput: CreateProjectDto;
};


export type MutationCreateRoleArgs = {
  data: CreateRoleDto;
};


export type MutationCreateSubscriptionArgs = {
  createSubscriptionInput: CreateSubscriptionDto;
};


export type MutationCreateSubscriptionWithPlansArgs = {
  createSubscriptionInput: CreateSubscriptionDto;
  planIds?: InputMaybe<Array<Scalars['Int']['input']>>;
};


export type MutationCreateUserArgs = {
  data: CreateUserDto;
};


export type MutationCreateVehicleArgs = {
  createVehicleInput: CreateVehicleDto;
};


export type MutationCreateVehicleExpenseArgs = {
  data: CreateVehicleExpenseDto;
};


export type MutationCreateWarehouseArgs = {
  CreateWarehouseDto: CreateWarehouseDto;
};


export type MutationDeleteBreakdownArgs = {
  id: Scalars['Int']['input'];
};


export type MutationDeleteCouponArgs = {
  id: Scalars['Int']['input'];
};


export type MutationDeleteMetingArgs = {
  id: Scalars['Float']['input'];
};


export type MutationDeleteMetingTaskArgs = {
  id: Scalars['Float']['input'];
};


export type MutationDeleteMetingTypeArgs = {
  id: Scalars['Float']['input'];
};


export type MutationDeleteMetingVenueArgs = {
  id: Scalars['Float']['input'];
};


export type MutationDeleteModuleArgs = {
  id: Scalars['Int']['input'];
};


export type MutationDeleteNotesArgs = {
  id: Scalars['Float']['input'];
};


export type MutationDeleteOfferArgs = {
  id: Scalars['Int']['input'];
};


export type MutationDeleteOrganizationArgs = {
  id: Scalars['Int']['input'];
};


export type MutationDeletePackageArgs = {
  id: Scalars['Int']['input'];
};


export type MutationDeletePermissionArgs = {
  id: Scalars['Float']['input'];
};


export type MutationDeletePlanArgs = {
  id: Scalars['Int']['input'];
};


export type MutationDeleteProjectArgs = {
  id: Scalars['Int']['input'];
};


export type MutationDeleteRoleArgs = {
  id: Scalars['Float']['input'];
};


export type MutationDeleteSubscriptionArgs = {
  id: Scalars['Int']['input'];
};


export type MutationDeleteUserArgs = {
  id: Scalars['Float']['input'];
};


export type MutationDeleteVehicleArgs = {
  id: Scalars['Int']['input'];
};


export type MutationDeleteVehicleExpenseArgs = {
  id: Scalars['Int']['input'];
};


export type MutationDeleteWarehouseArgs = {
  id: Scalars['Float']['input'];
};


export type MutationEnableMeetingStatusArgs = {
  data: MeetingStatusDto;
};


export type MutationEnableMeetingTaskStatusArgs = {
  data: MeetingTaskStatusDto;
};


export type MutationEnableOrganizationStatusArgs = {
  data: OrganizationStatusDto;
};


export type MutationEnableProjectStatusArgs = {
  data: ProjectStatusDto;
};


export type MutationEnableUserStatusArgs = {
  data: RoleStatusDto;
};


export type MutationEnableVehicleStatusArgs = {
  data: VehicleStatusDto;
};


export type MutationForgotPasswordArgs = {
  email: Scalars['String']['input'];
};


export type MutationHardDeleteCouponArgs = {
  id: Scalars['Int']['input'];
};


export type MutationHardDeleteMeetingArgs = {
  id: Scalars['Float']['input'];
};


export type MutationHardDeleteMeetingTaskArgs = {
  id: Scalars['Float']['input'];
};


export type MutationHardDeleteMeetingTypeArgs = {
  id: Scalars['Int']['input'];
};


export type MutationHardDeleteMeetingVenueArgs = {
  id: Scalars['Float']['input'];
};


export type MutationHardDeleteModuleArgs = {
  id: Scalars['Int']['input'];
};


export type MutationHardDeleteNotesArgs = {
  id: Scalars['Float']['input'];
};


export type MutationHardDeleteOfferArgs = {
  id: Scalars['Int']['input'];
};


export type MutationHardDeleteOrganizationArgs = {
  id: Scalars['Int']['input'];
};


export type MutationHardDeletePackageArgs = {
  id: Scalars['Int']['input'];
};


export type MutationHardDeletePlanArgs = {
  id: Scalars['Int']['input'];
};


export type MutationHardDeleteProjectArgs = {
  id: Scalars['Int']['input'];
};


export type MutationHardDeleteRoleArgs = {
  id: Scalars['Float']['input'];
};


export type MutationHardDeleteSubscriptionArgs = {
  id: Scalars['Int']['input'];
};


export type MutationHardDeleteUserArgs = {
  id: Scalars['Float']['input'];
};


export type MutationHardDeleteWarehouseArgs = {
  id: Scalars['Float']['input'];
};


export type MutationLoginArgs = {
  loginData: ValidateDto;
};


export type MutationRegisterArgs = {
  registerData: RegisterDto;
};


export type MutationRequestOtpArgs = {
  otpRequestData: OtpRequestDto;
};


export type MutationResetPasswordArgs = {
  newPassword: Scalars['String']['input'];
  reset: ValidateDto;
};


export type MutationRestoreCouponArgs = {
  id: Scalars['Int']['input'];
};


export type MutationRestoreMeetingArgs = {
  id: Scalars['Int']['input'];
};


export type MutationRestoreMeetingTaskArgs = {
  id: Scalars['Int']['input'];
};


export type MutationRestoreMeetingTypeArgs = {
  id: Scalars['Int']['input'];
};


export type MutationRestoreMeetingVenueArgs = {
  id: Scalars['Int']['input'];
};


export type MutationRestoreModuleArgs = {
  id: Scalars['Int']['input'];
};


export type MutationRestoreNotesArgs = {
  id: Scalars['Float']['input'];
};


export type MutationRestoreOfferArgs = {
  id: Scalars['Int']['input'];
};


export type MutationRestoreOrganizationArgs = {
  id: Scalars['Int']['input'];
};


export type MutationRestorePackageArgs = {
  id: Scalars['Int']['input'];
};


export type MutationRestorePlanArgs = {
  id: Scalars['Int']['input'];
};


export type MutationRestoreProjectArgs = {
  id: Scalars['Int']['input'];
};


export type MutationRestoreRoleArgs = {
  id: Scalars['Float']['input'];
};


export type MutationRestoreSubscriptionArgs = {
  id: Scalars['Int']['input'];
};


export type MutationRestoreUserArgs = {
  id: Scalars['Float']['input'];
};


export type MutationRestoreVehicleArgs = {
  id: Scalars['Float']['input'];
};


export type MutationRestoreVehicleBreakdownArgs = {
  id: Scalars['Float']['input'];
};


export type MutationRestoreVehicleExpenseArgs = {
  id: Scalars['Float']['input'];
};


export type MutationRestoreWarehouseArgs = {
  id: Scalars['Float']['input'];
};


export type MutationSendRegistrationOtpArgs = {
  email: Scalars['String']['input'];
};


export type MutationUpdateBreakdownArgs = {
  data: UpdateBreakdownDto;
};


export type MutationUpdateCouponArgs = {
  updateCouponInput: UpdateCouponDto;
};


export type MutationUpdateMeetingArgs = {
  updateMeetingInput: UpdateMeetingDto;
};


export type MutationUpdateMeetingTaskArgs = {
  updateMeetingTaskInput: UpdateMeetingTaskDto;
};


export type MutationUpdateMeetingTaskStatusByAdminArgs = {
  input: MeetingTaskStatusDto;
};


export type MutationUpdateMeetingTypeArgs = {
  updateMeetingTypeInput: UpdateMeetingTypeDto;
};


export type MutationUpdateMeetingVenueArgs = {
  updateMeetingVenueInput: UpdateMeetingVenueDto;
};


export type MutationUpdateModuleArgs = {
  updateModuleInput: UpdateModuleDto;
};


export type MutationUpdateNotesArgs = {
  updateNotesInput: UpdateNotesDto;
};


export type MutationUpdateOfferArgs = {
  updateOfferInput: UpdateOfferDto;
};


export type MutationUpdateOrganizationArgs = {
  updateOrganizationInput: UpdateOrganizationDto;
};


export type MutationUpdatePackageArgs = {
  updatePackageInput: UpdatePackageDto;
};


export type MutationUpdatePermissionArgs = {
  data: UpdatePermissionDto;
};


export type MutationUpdatePlanArgs = {
  updatePlanInput: UpdatePlanDto;
};


export type MutationUpdateProfileArgs = {
  data: UpdateUserDto;
};


export type MutationUpdateProjectArgs = {
  updateProjectInput: UpdateProjectDto;
};


export type MutationUpdateRoleArgs = {
  data: UpdateRoleDto;
};


export type MutationUpdateSubscriptionArgs = {
  updateSubscriptionInput: UpdateSubscriptionDto;
};


export type MutationUpdateUserArgs = {
  data: UpdateUserDto;
};


export type MutationUpdateVehicleArgs = {
  updateVehicleInput: UpdateVehicleDto;
};


export type MutationUpdateVehicleExpenseArgs = {
  updateVehicleExpenseInput: UpdateVehicleExpenseDto;
};


export type MutationUpdateWarehouseArgs = {
  UpdateWarehouseDto: UpdateWarehouseDto;
};

export type Notes = {
  __typename?: 'Notes';
  createdAt: Scalars['DateTime']['output'];
  decision?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  meeting?: Maybe<Meeting>;
  meetingId?: Maybe<Scalars['Float']['output']>;
  notes?: Maybe<Scalars['String']['output']>;
  uploadDoc?: Maybe<Scalars['String']['output']>;
};

export type Offer = {
  __typename?: 'Offer';
  cashbackAmount: Scalars['Float']['output'];
  description?: Maybe<Scalars['String']['output']>;
  discountType: Scalars['String']['output'];
  discountValue: Scalars['Float']['output'];
  endDate: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  maxDiscountAmount: Scalars['Float']['output'];
  minOrderAmount: Scalars['Float']['output'];
  offerType: Scalars['String']['output'];
  startDate: Scalars['DateTime']['output'];
  status: Scalars['String']['output'];
  title: Scalars['String']['output'];
  usageLimit: Scalars['Float']['output'];
};

/** OFFER STATUS */
export enum OfferStatus {
  Active = 'active',
  Expired = 'expired',
  Inactive = 'inactive'
}

export type OfferStatusDto = {
  id: Scalars['Float']['input'];
  status: OfferStatus;
};

/** Offer Status */
export enum OfferTypeStatus {
  BuyOneGetOne = 'BUY_ONE_GET_ONE',
  Cashback = 'CASHBACK',
  Discount = 'DISCOUNT'
}

export type Organization = {
  __typename?: 'Organization';
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  status: Scalars['String']['output'];
};

export type OrganizationStatusDto = {
  id: Scalars['Float']['input'];
  status: CustomStatus;
};

export type OtpRequestDto = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type OtpRes = {
  __typename?: 'OtpRes';
  message?: Maybe<Scalars['String']['output']>;
  otp?: Maybe<Scalars['Float']['output']>;
  otpGeneratedSuccessfully: Scalars['Boolean']['output'];
};

export type Package = {
  __typename?: 'Package';
  description?: Maybe<Scalars['String']['output']>;
  discountedPrice: Scalars['Float']['output'];
  id: Scalars['ID']['output'];
  modules: Array<ApplicationModule>;
  name: Scalars['String']['output'];
  offer?: Maybe<Offer>;
  offerId?: Maybe<Scalars['Float']['output']>;
  price: Scalars['Float']['output'];
  status: Scalars['String']['output'];
};

/** Package Status */
export enum PackageStatus {
  Active = 'active',
  Expired = 'expired',
  Inactive = 'inactive'
}

export type PackageStatusDto = {
  id: Scalars['Float']['input'];
  status: PackageStatus;
};

export type PaginatedApplicationModules = {
  __typename?: 'PaginatedApplicationModules';
  data: Array<ApplicationModule>;
  meta: Meta;
};

export type PaginatedBreakdowns = {
  __typename?: 'PaginatedBreakdowns';
  data: Array<Breakdown>;
  meta: Meta;
};

export type PaginatedCoupons = {
  __typename?: 'PaginatedCoupons';
  data: Array<Coupon>;
  meta: Meta;
};

export type PaginatedMeeting = {
  __typename?: 'PaginatedMeeting';
  data: Array<Meeting>;
  meta: Meta;
};

export type PaginatedMeetingTask = {
  __typename?: 'PaginatedMeetingTask';
  data: Array<MeetingTask>;
  meta: Meta;
};

export type PaginatedMeetingType = {
  __typename?: 'PaginatedMeetingType';
  data: Array<MeetingType>;
  meta: Meta;
};

export type PaginatedMeetingVenue = {
  __typename?: 'PaginatedMeetingVenue';
  data: Array<MeetingVenue>;
  meta: Meta;
};

export type PaginatedNotes = {
  __typename?: 'PaginatedNotes';
  data: Array<Notes>;
  meta: Meta;
};

export type PaginatedOffers = {
  __typename?: 'PaginatedOffers';
  data: Array<Offer>;
  meta: Meta;
};

export type PaginatedOrganizations = {
  __typename?: 'PaginatedOrganizations';
  data: Array<Organization>;
  meta: Meta;
};

export type PaginatedPackages = {
  __typename?: 'PaginatedPackages';
  data: Array<Package>;
  meta: Meta;
};

export type PaginatedPermissions = {
  __typename?: 'PaginatedPermissions';
  data: Array<Permissions>;
  meta: Meta;
};

export type PaginatedPlans = {
  __typename?: 'PaginatedPlans';
  data: Array<Plan>;
  meta: Meta;
};

export type PaginatedProjects = {
  __typename?: 'PaginatedProjects';
  data: Array<Project>;
  meta: Meta;
};

export type PaginatedRoles = {
  __typename?: 'PaginatedRoles';
  data: Array<Role>;
  meta: Meta;
};

export type PaginatedSubscriptions = {
  __typename?: 'PaginatedSubscriptions';
  data: Array<Subscriptions>;
  meta: Meta;
};

export type PaginatedUsers = {
  __typename?: 'PaginatedUsers';
  data: Array<User>;
  meta: Meta;
};

export type PaginatedVehicleExpense = {
  __typename?: 'PaginatedVehicleExpense';
  data: Array<VehicleExpense>;
  meta: Meta;
};

export type PaginatedVehicles = {
  __typename?: 'PaginatedVehicles';
  data: Array<Vehicle>;
  meta: Meta;
};

export type PaginatedWarehouse = {
  __typename?: 'PaginatedWarehouse';
  data: Array<Warehouse>;
  meta: Meta;
};

export type PermissionDto = {
  __typename?: 'PermissionDto';
  action: Scalars['String']['output'];
  description: Scalars['String']['output'];
  id: Scalars['Float']['output'];
  module: Scalars['String']['output'];
  slug: Scalars['String']['output'];
};

export type PermissionGroup = {
  __typename?: 'PermissionGroup';
  modules: Array<Module>;
};

export type PermissionGroupDto = {
  __typename?: 'PermissionGroupDto';
  name: Scalars['String']['output'];
  permissions: Array<PermissionDto>;
};

export type Permissions = {
  __typename?: 'Permissions';
  action: Scalars['String']['output'];
  appName: Scalars['String']['output'];
  description: Scalars['String']['output'];
  groupName: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  module: Scalars['String']['output'];
  slug: Scalars['String']['output'];
};

export type Plan = {
  __typename?: 'Plan';
  couponId: Scalars['ID']['output'];
  description?: Maybe<Scalars['String']['output']>;
  discountedPrice: Scalars['Float']['output'];
  duration: Scalars['Float']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  offerId: Scalars['ID']['output'];
  package: Package;
  price: Scalars['Float']['output'];
  status: Scalars['String']['output'];
};

/** Plan Status */
export enum PlanStatus {
  Active = 'active',
  Expired = 'expired',
  Inactive = 'inactive'
}

export type PlanStatusDto = {
  id: Scalars['Float']['input'];
  status: PlanStatus;
};

export type Post = {
  __typename?: 'Post';
  authorId: Scalars['Int']['output'];
  id: Scalars['ID']['output'];
  title: Scalars['String']['output'];
  user: User;
};

export type Project = {
  __typename?: 'Project';
  createdBy?: Maybe<User>;
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  organization?: Maybe<Organization>;
  organizationId: Scalars['Float']['output'];
  status: Scalars['String']['output'];
};

export type ProjectStatusDto = {
  id: Scalars['Float']['input'];
  status: CustomStatus;
};

export type Query = {
  __typename?: 'Query';
  MeetingCalender: Array<Meeting>;
  MeetingTaskCalender: Array<MeetingTask>;
  allPermissions: DynamicPermissionsDto;
  dashboardCount: DashboardCount;
  dropdownOffers: PaginatedOffers;
  findBreakdownById: Breakdown;
  findCouponById: Coupon;
  findMeetingsByParentId: Array<Meeting>;
  findModuleById: ApplicationModule;
  findOfferById: Offer;
  findOrganizationById: Organization;
  findPackageById: Package;
  findPermissionById: Permissions;
  findPermissionsByUser: Array<Scalars['String']['output']>;
  findPlanById: Plan;
  findRoleById: Role;
  findSubscriptionById: Subscriptions;
  findUserById: User;
  findVehicleById: Vehicle;
  findVehicleExpenseById: VehicleExpense;
  findWarehouseById: Warehouse;
  getBreakdownStatuses: Array<BreakdownStatus>;
  getMeetingDashboard: Dashboard;
  getMeetingId: Meeting;
  getMeetingIdTask: MeetingTask;
  getMeetingType: MeetingType;
  getMeetingVenue: MeetingVenue;
  getNotesId: Notes;
  getVehicleExpenseTypeSuggestions: Array<Scalars['String']['output']>;
  listTrashedMeeting: PaginatedMeeting;
  listTrashedMeetingTask: PaginatedMeetingTask;
  listTrashedMeetingType: PaginatedMeetingType;
  listTrashedMeetingVenue: PaginatedMeetingVenue;
  listTrashedNotes: PaginatedNotes;
  listTrashedOrganizations: PaginatedOrganizations;
  listTrashedProjects: PaginatedProjects;
  paginatedBreakdowns: PaginatedBreakdowns;
  paginatedCoupons: PaginatedCoupons;
  paginatedMeeting: PaginatedMeeting;
  paginatedMeetingTask: PaginatedMeetingTask;
  paginatedMeetingType: PaginatedMeetingType;
  paginatedMeetingVenue: PaginatedMeetingVenue;
  paginatedModules: PaginatedApplicationModules;
  paginatedNotes: PaginatedNotes;
  paginatedOffers: PaginatedOffers;
  paginatedOrganization: PaginatedOrganizations;
  paginatedPackages: PaginatedPackages;
  paginatedPermissions: PaginatedPermissions;
  paginatedPlans: PaginatedPlans;
  paginatedProjects: PaginatedProjects;
  paginatedRoles: PaginatedRoles;
  paginatedSubscriptions: PaginatedSubscriptions;
  paginatedTrashedWarehouses: PaginatedWarehouse;
  paginatedUsers: PaginatedUsers;
  paginatedVehicleExpense: PaginatedVehicleExpense;
  paginatedVehicles: PaginatedVehicles;
  paginatedWarehouses: PaginatedWarehouse;
  permissionGroup: PermissionGroup;
  post: Post;
  posts: Array<Post>;
  project: Project;
  trashedCoupons: PaginatedCoupons;
  trashedModules: PaginatedApplicationModules;
  trashedOffers: PaginatedOffers;
  trashedPackages: PaginatedPackages;
  trashedPlans: PaginatedPlans;
  trashedSubscriptions: PaginatedSubscriptions;
  trashedUsers: PaginatedUsers;
};


export type QueryMeetingCalenderArgs = {
  filters?: InputMaybe<MeetingFiltersDto>;
};


export type QueryMeetingTaskCalenderArgs = {
  filters?: InputMaybe<MeetingTaskFiltersDto>;
};


export type QueryDashboardCountArgs = {
  filters: ReportFilters;
};


export type QueryDropdownOffersArgs = {
  ListInputDTO: ListInputDto;
};


export type QueryFindBreakdownByIdArgs = {
  id: Scalars['Int']['input'];
};


export type QueryFindCouponByIdArgs = {
  id: Scalars['Int']['input'];
};


export type QueryFindMeetingsByParentIdArgs = {
  parentMeetingId: Scalars['Float']['input'];
};


export type QueryFindModuleByIdArgs = {
  id: Scalars['Int']['input'];
};


export type QueryFindOfferByIdArgs = {
  id: Scalars['Int']['input'];
};


export type QueryFindOrganizationByIdArgs = {
  id: Scalars['Int']['input'];
};


export type QueryFindPackageByIdArgs = {
  id: Scalars['Int']['input'];
};


export type QueryFindPermissionByIdArgs = {
  id: Scalars['Float']['input'];
};


export type QueryFindPermissionsByUserArgs = {
  id: Scalars['Float']['input'];
};


export type QueryFindPlanByIdArgs = {
  id: Scalars['Int']['input'];
};


export type QueryFindRoleByIdArgs = {
  id: Scalars['Float']['input'];
};


export type QueryFindSubscriptionByIdArgs = {
  id: Scalars['Int']['input'];
};


export type QueryFindUserByIdArgs = {
  id: Scalars['Float']['input'];
};


export type QueryFindVehicleByIdArgs = {
  id: Scalars['Int']['input'];
};


export type QueryFindVehicleExpenseByIdArgs = {
  id: Scalars['Int']['input'];
};


export type QueryFindWarehouseByIdArgs = {
  id: Scalars['Float']['input'];
};


export type QueryGetBreakdownStatusesArgs = {
  breakdownId: Scalars['Int']['input'];
};


export type QueryGetMeetingDashboardArgs = {
  filters?: InputMaybe<DashboardFilters>;
};


export type QueryGetMeetingIdArgs = {
  id: Scalars['Float']['input'];
};


export type QueryGetMeetingIdTaskArgs = {
  id: Scalars['Float']['input'];
};


export type QueryGetMeetingTypeArgs = {
  id: Scalars['Float']['input'];
};


export type QueryGetMeetingVenueArgs = {
  id: Scalars['Float']['input'];
};


export type QueryGetNotesIdArgs = {
  id: Scalars['Float']['input'];
};


export type QueryGetVehicleExpenseTypeSuggestionsArgs = {
  search?: InputMaybe<Scalars['String']['input']>;
};


export type QueryListTrashedMeetingArgs = {
  ListInputDTO: ListInputDto;
};


export type QueryListTrashedMeetingTaskArgs = {
  ListInputDTO: ListInputDto;
};


export type QueryListTrashedMeetingTypeArgs = {
  ListInputDTO: ListInputDto;
};


export type QueryListTrashedMeetingVenueArgs = {
  ListInputDTO: ListInputDto;
};


export type QueryListTrashedNotesArgs = {
  ListInputDto: ListInputDto;
};


export type QueryListTrashedOrganizationsArgs = {
  ListInputDTO: ListInputDto;
};


export type QueryListTrashedProjectsArgs = {
  ListInputDTO: ListInputDto;
};


export type QueryPaginatedBreakdownsArgs = {
  ListInputDTO: ListInputDto;
};


export type QueryPaginatedCouponsArgs = {
  ListInputDTO: ListInputDto;
};


export type QueryPaginatedMeetingArgs = {
  ListInputDTO: ListInputDto;
};


export type QueryPaginatedMeetingTaskArgs = {
  ListInputDTO: ListInputDto;
};


export type QueryPaginatedMeetingTypeArgs = {
  ListInputDTO: ListInputDto;
};


export type QueryPaginatedMeetingVenueArgs = {
  ListInputDTO: ListInputDto;
};


export type QueryPaginatedModulesArgs = {
  ListInputDTO: ListInputDto;
};


export type QueryPaginatedNotesArgs = {
  ListInputDTO: ListInputDto;
};


export type QueryPaginatedOffersArgs = {
  ListInputDTO: ListInputDto;
};


export type QueryPaginatedOrganizationArgs = {
  ListInputDTO: ListInputDto;
};


export type QueryPaginatedPackagesArgs = {
  ListInputDTO: ListInputDto;
};


export type QueryPaginatedPermissionsArgs = {
  ListInputDTO: ListInputDto;
};


export type QueryPaginatedPlansArgs = {
  ListInputDTO: ListInputDto;
};


export type QueryPaginatedProjectsArgs = {
  ListInputDTO: ListInputDto;
};


export type QueryPaginatedRolesArgs = {
  ListInputDTO: ListInputDto;
};


export type QueryPaginatedSubscriptionsArgs = {
  ListInputDTO: ListInputDto;
};


export type QueryPaginatedTrashedWarehousesArgs = {
  ListInputDTO: ListInputDto;
};


export type QueryPaginatedUsersArgs = {
  ListInputDTO: ListInputDto;
};


export type QueryPaginatedVehicleExpenseArgs = {
  ListInputDTO: ListInputDto;
};


export type QueryPaginatedVehiclesArgs = {
  ListInputDTO: ListInputDto;
};


export type QueryPaginatedWarehousesArgs = {
  ListInputDTO: ListInputDto;
};


export type QueryPostArgs = {
  id: Scalars['ID']['input'];
};


export type QueryProjectArgs = {
  id: Scalars['Int']['input'];
};


export type QueryTrashedCouponsArgs = {
  ListInputDTO: ListInputDto;
};


export type QueryTrashedModulesArgs = {
  ListInputDTO: ListInputDto;
};


export type QueryTrashedOffersArgs = {
  ListInputDTO: ListInputDto;
};


export type QueryTrashedPackagesArgs = {
  ListInputDTO: ListInputDto;
};


export type QueryTrashedPlansArgs = {
  ListInputDTO: ListInputDto;
};


export type QueryTrashedSubscriptionsArgs = {
  ListInputDTO: ListInputDto;
};


export type QueryTrashedUsersArgs = {
  ListInputDTO: ListInputDto;
};

export type RegisterDto = {
  avatar?: InputMaybe<Scalars['String']['input']>;
  createdBy?: InputMaybe<Scalars['Float']['input']>;
  email: Scalars['String']['input'];
  emailOTP: Scalars['Float']['input'];
  mobileNo?: InputMaybe<Scalars['Float']['input']>;
  name: Scalars['String']['input'];
  password: Scalars['String']['input'];
  roleId?: InputMaybe<Scalars['Float']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
};

export type ReportFilters = {
  endDate?: InputMaybe<Scalars['DateTime']['input']>;
  month?: InputMaybe<Scalars['Float']['input']>;
  startDate?: InputMaybe<Scalars['DateTime']['input']>;
  year?: InputMaybe<Scalars['String']['input']>;
};

export type Role = {
  __typename?: 'Role';
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  organization?: Maybe<Organization>;
  permissionCount: Scalars['Float']['output'];
  permissions: Array<Permissions>;
  roleType?: Maybe<Scalars['String']['output']>;
  status: Scalars['String']['output'];
};

export type RoleStatusDto = {
  id: Scalars['Float']['input'];
  status: CustomStatus;
};

/** Subscription Status */
export enum SubscriptionStatus {
  Active = 'active',
  Expired = 'expired',
  Inactive = 'inactive'
}

export type SubscriptionStatusDto = {
  id: Scalars['Float']['input'];
  status: SubscriptionStatus;
};

export type Subscriptions = {
  __typename?: 'Subscriptions';
  duration: Scalars['Float']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  plans: Array<Plan>;
  price: Scalars['Float']['output'];
  status: Scalars['String']['output'];
};

export type Supplier = {
  __typename?: 'Supplier';
  address?: Maybe<Scalars['String']['output']>;
  contactPerson?: Maybe<Scalars['String']['output']>;
  email: Scalars['String']['output'];
  gstNumber?: Maybe<Scalars['String']['output']>;
  id: Scalars['Float']['output'];
  name: Scalars['String']['output'];
  phone?: Maybe<Scalars['String']['output']>;
  status: Scalars['String']['output'];
};

export type Unit = {
  __typename?: 'Unit';
  conversionFactor?: Maybe<Scalars['Float']['output']>;
  createdAt: Scalars['DateTime']['output'];
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  parentUnit?: Maybe<Unit>;
  parentUnitId?: Maybe<Scalars['Int']['output']>;
  symbol: Scalars['String']['output'];
  type: UnitType;
  updatedAt: Scalars['DateTime']['output'];
};

/** UnitType */
export enum UnitType {
  Area = 'area',
  Density = 'density',
  Length = 'length',
  Time = 'time',
  Volume = 'volume',
  Weight = 'weight'
}

export type UpdateBreakdownDto = {
  breakdownDate: Scalars['String']['input'];
  breakdownDescription: Scalars['String']['input'];
  breakdownLocation: Scalars['String']['input'];
  breakdownType: Scalars['String']['input'];
  id: Scalars['Int']['input'];
  latitude: Scalars['String']['input'];
  longitude: Scalars['String']['input'];
  mediaUrl?: InputMaybe<Array<MediaDto>>;
  vehicleId: Scalars['Float']['input'];
};

export type UpdateCouponDto = {
  couponCode: Scalars['String']['input'];
  description: Scalars['String']['input'];
  discountType: DiscountType;
  endDate: Scalars['String']['input'];
  id: Scalars['Float']['input'];
  maxDiscountAmount: Scalars['Float']['input'];
  minOrderAmount: Scalars['Float']['input'];
  startDate: Scalars['String']['input'];
  usageLimit: Scalars['Float']['input'];
};

export type UpdateMeetingDto = {
  attendees?: InputMaybe<Array<Scalars['String']['input']>>;
  endTime?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['Float']['input'];
  meetingAgenda?: InputMaybe<Scalars['String']['input']>;
  meetingDate?: InputMaybe<Scalars['DateTime']['input']>;
  meetingReference?: InputMaybe<Scalars['String']['input']>;
  meetingTypeId?: InputMaybe<Scalars['Float']['input']>;
  meetingUrl?: InputMaybe<Scalars['String']['input']>;
  meetingVenueId?: InputMaybe<Scalars['Float']['input']>;
  parentMeetingId?: InputMaybe<Scalars['Float']['input']>;
  projectId?: InputMaybe<Scalars['Float']['input']>;
  startTime?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
  uploadDoc?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateMeetingTaskDto = {
  comment?: InputMaybe<Scalars['String']['input']>;
  completePercent?: InputMaybe<Scalars['Float']['input']>;
  completedDate?: InputMaybe<Scalars['DateTime']['input']>;
  dueDate?: InputMaybe<Scalars['DateTime']['input']>;
  id: Scalars['Float']['input'];
  meetingId?: InputMaybe<Scalars['Float']['input']>;
  notesId?: InputMaybe<Scalars['Float']['input']>;
  openedDate?: InputMaybe<Scalars['DateTime']['input']>;
  priority?: InputMaybe<Scalars['String']['input']>;
  projectId?: InputMaybe<Scalars['Float']['input']>;
  task?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateMeetingTypeDto = {
  id: Scalars['Float']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateMeetingVenueDto = {
  address: Scalars['String']['input'];
  contactNumber: Scalars['Float']['input'];
  contactPerson: Scalars['String']['input'];
  description: Scalars['String']['input'];
  id: Scalars['Float']['input'];
  name: Scalars['String']['input'];
  title: Scalars['String']['input'];
};

export type UpdateModuleDto = {
  description: Scalars['String']['input'];
  id: Scalars['Float']['input'];
  name: Scalars['String']['input'];
};

export type UpdateNotesDto = {
  decision?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['Float']['input'];
  meetingId?: InputMaybe<Scalars['Float']['input']>;
  notes?: InputMaybe<Scalars['String']['input']>;
  uploadDoc?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateOfferDto = {
  cashbackAmount: Scalars['Float']['input'];
  description: Scalars['String']['input'];
  discountType: DiscountType;
  discountValue: Scalars['Float']['input'];
  endDate: Scalars['String']['input'];
  id: Scalars['Float']['input'];
  maxDiscountAmount: Scalars['Float']['input'];
  minOrderAmount: Scalars['Float']['input'];
  offerType: OfferTypeStatus;
  startDate: Scalars['String']['input'];
  title: Scalars['String']['input'];
  usageLimit: Scalars['Float']['input'];
};

export type UpdateOrganizationDto = {
  description: Scalars['String']['input'];
  id: Scalars['Float']['input'];
  name: Scalars['String']['input'];
};

export type UpdatePackageDto = {
  description: Scalars['String']['input'];
  discountedPrice: Scalars['Float']['input'];
  id: Scalars['Float']['input'];
  moduleIds: Array<Scalars['Int']['input']>;
  name: Scalars['String']['input'];
  offerId?: InputMaybe<Scalars['Float']['input']>;
  price: Scalars['Float']['input'];
};

export type UpdatePermissionDto = {
  action?: InputMaybe<Scalars['String']['input']>;
  appName?: InputMaybe<AppName>;
  description?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['Float']['input'];
  module?: InputMaybe<Scalars['String']['input']>;
};

export type UpdatePlanDto = {
  couponId: Scalars['Float']['input'];
  description: Scalars['String']['input'];
  discountedPrice: Scalars['Float']['input'];
  duration: Scalars['Float']['input'];
  id: Scalars['Float']['input'];
  name: Scalars['String']['input'];
  offerId: Scalars['Float']['input'];
  packageId: Scalars['Float']['input'];
  price: Scalars['Float']['input'];
};

export type UpdateProjectDto = {
  description?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['Float']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  organizationId?: InputMaybe<Scalars['Float']['input']>;
};

export type UpdateRoleDto = {
  description?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['Float']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  permissionIds?: InputMaybe<Array<Scalars['Float']['input']>>;
};

export type UpdateSubscriptionDto = {
  duration: Scalars['Float']['input'];
  id: Scalars['Float']['input'];
  name: Scalars['String']['input'];
  planIds: Array<Scalars['Int']['input']>;
  price: Scalars['Float']['input'];
};

export type UpdateUserDto = {
  avatar?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['Int']['input'];
  mobileNo?: InputMaybe<Scalars['Float']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  roleIds?: InputMaybe<Array<Scalars['Int']['input']>>;
  userType?: InputMaybe<UserType>;
};

export type UpdateVehicleDto = {
  chassisNumber?: InputMaybe<Scalars['String']['input']>;
  color?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['Float']['input'];
  insurance?: InputMaybe<Scalars['String']['input']>;
  maintenanceHistory?: InputMaybe<Scalars['String']['input']>;
  make?: InputMaybe<Scalars['String']['input']>;
  model?: InputMaybe<Scalars['String']['input']>;
  numberPlate?: InputMaybe<Scalars['String']['input']>;
  year?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateVehicleExpenseDto = {
  amount?: InputMaybe<Scalars['Float']['input']>;
  breakDownId?: InputMaybe<Scalars['Float']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  expenseDate?: InputMaybe<Scalars['String']['input']>;
  expenseType?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['Float']['input'];
  uploadDoc?: InputMaybe<Scalars['String']['input']>;
  vehicleId?: InputMaybe<Scalars['Float']['input']>;
};

export type UpdateWarehouseDto = {
  capacity?: InputMaybe<Scalars['Float']['input']>;
  contactPerson?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['Float']['input'];
  location?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  phone?: InputMaybe<Scalars['Float']['input']>;
};

export type User = {
  __typename?: 'User';
  avatar?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  email: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  mobileNo?: Maybe<Scalars['Float']['output']>;
  name: Scalars['String']['output'];
  organizationId?: Maybe<Scalars['Float']['output']>;
  parentId?: Maybe<Scalars['Float']['output']>;
  posts: Array<Post>;
  roles?: Maybe<Array<Role>>;
  status: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
  userType: UserType;
  username?: Maybe<Scalars['String']['output']>;
};

export type UserStatusDto = {
  id: Scalars['Float']['input'];
  status: CustomStatus;
};

/** User Type Status */
export enum UserType {
  Admin = 'admin',
  AdminEmployee = 'adminEmployee',
  Organization = 'organization',
  OrganizationEmployee = 'organizationEmployee',
  ThirdParty = 'thirdParty',
  ThirdPartyEmployee = 'thirdPartyEmployee'
}

export type ValidateDto = {
  email: Scalars['String']['input'];
  otp: Scalars['Float']['input'];
  password: Scalars['String']['input'];
};

export type Vehicle = {
  __typename?: 'Vehicle';
  chassisNumber: Scalars['String']['output'];
  color: Scalars['String']['output'];
  createdBy: User;
  createdById: Scalars['Int']['output'];
  id: Scalars['ID']['output'];
  insurance: Scalars['String']['output'];
  latitude?: Maybe<Scalars['Float']['output']>;
  longitude?: Maybe<Scalars['Float']['output']>;
  maintenanceHistory?: Maybe<Scalars['String']['output']>;
  make: Scalars['String']['output'];
  model: Scalars['String']['output'];
  numberPlate: Scalars['String']['output'];
  organizationBy: Organization;
  organizationId: Scalars['Int']['output'];
  status: Scalars['String']['output'];
  year: Scalars['String']['output'];
};

export type VehicleExpense = {
  __typename?: 'VehicleExpense';
  BreakDown?: Maybe<Breakdown>;
  amount: Scalars['Float']['output'];
  breakDownId?: Maybe<Scalars['Float']['output']>;
  createdBy: User;
  createdById: Scalars['Int']['output'];
  description?: Maybe<Scalars['String']['output']>;
  expenseDate?: Maybe<Scalars['DateTime']['output']>;
  expenseType: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  status: Scalars['String']['output'];
  uploadDoc?: Maybe<Scalars['String']['output']>;
  vehicle: Vehicle;
  vehicleId: Scalars['Int']['output'];
};

export type VehicleStatusDto = {
  id: Scalars['Float']['input'];
  status: Status;
};

export type Warehouse = {
  __typename?: 'Warehouse';
  capacity: Scalars['Float']['output'];
  contactPerson?: Maybe<Scalars['String']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  location: Scalars['String']['output'];
  name: Scalars['String']['output'];
  phone?: Maybe<Scalars['Float']['output']>;
  status: Scalars['String']['output'];
};

/** Warehouse Status */
export enum WarehouseStatus {
  Active = 'active',
  Full = 'full',
  Inactive = 'inactive',
  OutOfStock = 'outOfStock'
}

export type WarehouseStatusDto = {
  id: Scalars['Float']['input'];
  status: WarehouseStatus;
};

export enum AppName {
  MasterApp = 'MasterApp',
  MaterialManagement = 'MaterialManagement',
  TaskManagement = 'TaskManagement',
  VehicleManagement = 'VehicleManagement'
}

export enum Breakdown_Status {
  Active = 'Active',
  Assigned = 'Assigned',
  Breakdown = 'Breakdown',
  Closed = 'Closed',
  Completed = 'Completed',
  InService = 'InService',
  Inactive = 'Inactive',
  Reported = 'Reported',
  ServiceScheduled = 'ServiceScheduled',
  UnderApproval = 'UnderApproval',
  UnderReview = 'UnderReview'
}

export enum Status {
  Active = 'active',
  Breakdown = 'breakdown',
  Inactive = 'inactive',
  Maintenance = 'maintenance'
}

export type RequestOtpMutationVariables = Exact<{
  otpRequestData: OtpRequestDto;
}>;


export type RequestOtpMutation = { __typename?: 'Mutation', requestOtp: { __typename?: 'OtpRes', otpGeneratedSuccessfully: boolean, otp?: number | null, message?: string | null } };

export type LoginMutationVariables = Exact<{
  loginData: ValidateDto;
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'LoginRes', accessToken: string, user: { __typename?: 'User', id: string } } };

export type DeleteOrganizationMutationVariables = Exact<{
  deleteOrganizationId: Scalars['Int']['input'];
}>;


export type DeleteOrganizationMutation = { __typename?: 'Mutation', deleteOrganization: boolean };

export type RegisterMutationVariables = Exact<{
  registerData: RegisterDto;
}>;


export type RegisterMutation = { __typename?: 'Mutation', register: { __typename?: 'User', id: string, name: string, username?: string | null, mobileNo?: number | null, email: string, status: string, avatar?: string | null, parentId?: number | null } };

export type CreateOrganizationMutationVariables = Exact<{
  createOrganizationInput: CreateOrganizationDto;
}>;


export type CreateOrganizationMutation = { __typename?: 'Mutation', createOrganization: { __typename?: 'Organization', id: string, name: string, description?: string | null, status: string } };

export type EnableOrganizationStatusMutationVariables = Exact<{
  data: OrganizationStatusDto;
}>;


export type EnableOrganizationStatusMutation = { __typename?: 'Mutation', enableOrganizationStatus: { __typename?: 'Organization', id: string, name: string, description?: string | null, status: string } };

export type UpdateOrganizationMutationVariables = Exact<{
  updateOrganizationInput: UpdateOrganizationDto;
}>;


export type UpdateOrganizationMutation = { __typename?: 'Mutation', updateOrganization: { __typename?: 'Organization', id: string, name: string, description?: string | null, status: string } };

export type CreateUserMutationVariables = Exact<{
  data: CreateUserDto;
}>;


export type CreateUserMutation = { __typename?: 'Mutation', createUser: { __typename?: 'User', id: string, name: string, username?: string | null, mobileNo?: number | null, email: string, status: string, avatar?: string | null, parentId?: number | null, organizationId?: number | null, userType: UserType, createdAt: any, updatedAt: any, deletedAt?: any | null, roles?: Array<{ __typename?: 'Role', id: string, permissionCount: number, roleType?: string | null, name: string, status: string, permissions: Array<{ __typename?: 'Permissions', id: string, appName: string, groupName: string, module: string, action: string, slug: string, description: string }> }> | null } };

export type UpdateProfileMutationVariables = Exact<{
  data: UpdateUserDto;
}>;


export type UpdateProfileMutation = { __typename?: 'Mutation', updateProfile: { __typename?: 'User', id: string, name: string, username?: string | null, mobileNo?: number | null, email: string, status: string, avatar?: string | null, parentId?: number | null, organizationId?: number | null, userType: UserType, createdAt: any, updatedAt: any, deletedAt?: any | null } };

export type CreateModuleMutationVariables = Exact<{
  createModuleInput: CreateModuleDto;
}>;


export type CreateModuleMutation = { __typename?: 'Mutation', createModule: { __typename?: 'ApplicationModule', id: string, name: string, description?: string | null, status: string } };

export type UpdateModuleMutationVariables = Exact<{
  updateModuleInput: UpdateModuleDto;
}>;


export type UpdateModuleMutation = { __typename?: 'Mutation', updateModule: { __typename?: 'ApplicationModule', id: string, name: string, description?: string | null, status: string } };

export type ChangeModuleStatusMutationVariables = Exact<{
  updateModuleStatusInput: ModuleStatusDto;
}>;


export type ChangeModuleStatusMutation = { __typename?: 'Mutation', changeModuleStatus: { __typename?: 'ApplicationModule', id: string, name: string, status: string, description?: string | null } };

export type DeleteModuleMutationVariables = Exact<{
  deleteModuleId: Scalars['Int']['input'];
}>;


export type DeleteModuleMutation = { __typename?: 'Mutation', deleteModule: boolean };

export type CreateCouponMutationVariables = Exact<{
  createCouponInput: CreateCouponDto;
}>;


export type CreateCouponMutation = { __typename?: 'Mutation', createCoupon: { __typename?: 'Coupon', id: string, couponCode: string, description?: string | null, discountType: string, maxDiscountAmount: number, minOrderAmount: number, usageLimit: number, status: string, startDate: any, endDate: any } };

export type UpdateUserMutationVariables = Exact<{
  data: UpdateUserDto;
}>;


export type UpdateUserMutation = { __typename?: 'Mutation', updateUser: { __typename?: 'User', id: string, name: string, username?: string | null, mobileNo?: number | null, email: string, status: string, avatar?: string | null, parentId?: number | null, organizationId?: number | null, userType: UserType, createdAt: any, updatedAt: any, deletedAt?: any | null, roles?: Array<{ __typename?: 'Role', id: string, name: string, description?: string | null, roleType?: string | null, status: string }> | null } };

export type DeleteUserMutationVariables = Exact<{
  deleteUserId: Scalars['Float']['input'];
}>;


export type DeleteUserMutation = { __typename?: 'Mutation', deleteUser: boolean };

export type ChangeUserStatusMutationVariables = Exact<{
  data: UserStatusDto;
}>;


export type ChangeUserStatusMutation = { __typename?: 'Mutation', changeUserStatus: { __typename?: 'User', id: string, name: string, username?: string | null, mobileNo?: number | null, email: string, status: string, avatar?: string | null, parentId?: number | null, organizationId?: number | null, userType: UserType, createdAt: any, updatedAt: any, deletedAt?: any | null } };

export type UpdateCouponMutationVariables = Exact<{
  updateCouponInput: UpdateCouponDto;
}>;


export type UpdateCouponMutation = { __typename?: 'Mutation', updateCoupon: { __typename?: 'Coupon', id: string, couponCode: string, description?: string | null, discountType: string, maxDiscountAmount: number, minOrderAmount: number, usageLimit: number, status: string, startDate: any, endDate: any } };

export type ChangeCouponStatusMutationVariables = Exact<{
  updateCouponStatusInput: CouponStatusDto;
}>;


export type ChangeCouponStatusMutation = { __typename?: 'Mutation', changeCouponStatus: { __typename?: 'Coupon', id: string, couponCode: string, description?: string | null, discountType: string, maxDiscountAmount: number, minOrderAmount: number, usageLimit: number, status: string, startDate: any, endDate: any } };

export type DeleteCouponMutationVariables = Exact<{
  deleteCouponId: Scalars['Int']['input'];
}>;


export type DeleteCouponMutation = { __typename?: 'Mutation', deleteCoupon: boolean };

export type PaginatedPackagesQueryVariables = Exact<{
  listInputDto: ListInputDto;
}>;


export type PaginatedPackagesQuery = { __typename?: 'Query', paginatedPackages: { __typename?: 'PaginatedPackages', meta: { __typename?: 'Meta', totalItems: number, totalPages: number, currentPage: number, limit: number }, data: Array<{ __typename?: 'Package', id: string, name: string, description?: string | null, price: number, discountedPrice: number, status: string, offerId?: number | null, modules: Array<{ __typename?: 'ApplicationModule', id: string, name: string, description?: string | null, status: string }>, offer?: { __typename?: 'Offer', id: string, title: string, description?: string | null, offerType: string, discountType: string, discountValue: number, maxDiscountAmount: number, cashbackAmount: number, minOrderAmount: number, usageLimit: number, status: string, startDate: any, endDate: any } | null }> } };

export type UpdatePackageMutationVariables = Exact<{
  updatePackageInput: UpdatePackageDto;
}>;


export type UpdatePackageMutation = { __typename?: 'Mutation', updatePackage: { __typename?: 'Package', id: string, name: string, description?: string | null, price: number, discountedPrice: number, status: string, offerId?: number | null, modules: Array<{ __typename?: 'ApplicationModule', id: string, name: string, description?: string | null, status: string }>, offer?: { __typename?: 'Offer', id: string, title: string, description?: string | null, offerType: string, discountType: string, discountValue: number, maxDiscountAmount: number, cashbackAmount: number, minOrderAmount: number, usageLimit: number, status: string, startDate: any, endDate: any } | null } };

export type CreatePackageMutationVariables = Exact<{
  createPackageInput: CreatePackageDto;
}>;


export type CreatePackageMutation = { __typename?: 'Mutation', createPackage: { __typename?: 'Package', id: string, name: string, description?: string | null, price: number, discountedPrice: number, status: string, offerId?: number | null } };

export type PaginatedOrganizationQueryVariables = Exact<{
  listInputDto: ListInputDto;
}>;


export type PaginatedOrganizationQuery = { __typename?: 'Query', paginatedOrganization: { __typename?: 'PaginatedOrganizations', meta: { __typename?: 'Meta', totalItems: number, totalPages: number, currentPage: number, limit: number }, data: Array<{ __typename?: 'Organization', id: string, name: string, description?: string | null, status: string }> } };

export type ModulesQueryVariables = Exact<{ [key: string]: never; }>;


export type ModulesQuery = { __typename?: 'Query', permissionGroup: { __typename?: 'PermissionGroup', modules: Array<{ __typename?: 'Module', name: string, groups: Array<{ __typename?: 'Group', name: string, permissions: Array<{ __typename?: 'Permissions', action: string, appName: string, description: string, groupName: string, id: string, module: string, slug: string }> }> }> } };

export type PaginatedProjectsQueryVariables = Exact<{
  listInputDto: ListInputDto;
}>;


export type PaginatedProjectsQuery = { __typename?: 'Query', paginatedProjects: { __typename?: 'PaginatedProjects', data: Array<{ __typename?: 'Project', id: string, name: string, description?: string | null, status: string, organizationId: number }> } };

export type PaginatedUsersQueryVariables = Exact<{
  listInputDto: ListInputDto;
}>;


export type PaginatedUsersQuery = { __typename?: 'Query', paginatedUsers: { __typename?: 'PaginatedUsers', meta: { __typename?: 'Meta', totalItems: number, totalPages: number, currentPage: number, limit: number }, data: Array<{ __typename?: 'User', avatar?: string | null, email: string, deletedAt?: any | null, createdAt: any, id: string, mobileNo?: number | null, name: string, organizationId?: number | null, parentId?: number | null, status: string, userType: UserType, username?: string | null, updatedAt: any, roles?: Array<{ __typename?: 'Role', id: string, name: string, roleType?: string | null }> | null }> } };

export type PaginatedRolesQueryVariables = Exact<{
  listInputDto: ListInputDto;
}>;


export type PaginatedRolesQuery = { __typename?: 'Query', paginatedRoles: { __typename?: 'PaginatedRoles', meta: { __typename?: 'Meta', totalItems: number, totalPages: number, currentPage: number, limit: number }, data: Array<{ __typename?: 'Role', id: string, name: string, description?: string | null, roleType?: string | null, permissionCount: number }> } };

export type FindUserByIdQueryVariables = Exact<{
  findUserByIdId: Scalars['Float']['input'];
}>;


export type FindUserByIdQuery = { __typename?: 'Query', findUserById: { __typename?: 'User', id: string, name: string, username?: string | null, mobileNo?: number | null, email: string, status: string, avatar?: string | null, parentId?: number | null, organizationId?: number | null, userType: UserType, createdAt: any, updatedAt: any, deletedAt?: any | null } };

export type PaginatedModulesQueryVariables = Exact<{
  listInputDto: ListInputDto;
}>;


export type PaginatedModulesQuery = { __typename?: 'Query', paginatedModules: { __typename?: 'PaginatedApplicationModules', data: Array<{ __typename?: 'ApplicationModule', id: string, name: string, description?: string | null, status: string }>, meta: { __typename?: 'Meta', totalItems: number, totalPages: number, currentPage: number, limit: number } } };

export type PaginatedCouponsQueryVariables = Exact<{
  listInputDto: ListInputDto;
}>;


export type PaginatedCouponsQuery = { __typename?: 'Query', paginatedCoupons: { __typename?: 'PaginatedCoupons', data: Array<{ __typename?: 'Coupon', id: string, couponCode: string, description?: string | null, discountType: string, maxDiscountAmount: number, minOrderAmount: number, usageLimit: number, status: string, startDate: any, endDate: any }>, meta: { __typename?: 'Meta', totalItems: number, totalPages: number, currentPage: number, limit: number } } };

export type PaginatedSubscriptionsQueryVariables = Exact<{
  listInputDto: ListInputDto;
}>;


export type PaginatedSubscriptionsQuery = { __typename?: 'Query', paginatedSubscriptions: { __typename?: 'PaginatedSubscriptions', data: Array<{ __typename?: 'Subscriptions', id: string, name: string, price: number, duration: number, status: string, plans: Array<{ __typename?: 'Plan', id: string, name: string, description?: string | null, price: number, duration: number, discountedPrice: number, status: string, couponId: string, offerId: string }> }>, meta: { __typename?: 'Meta', totalItems: number, totalPages: number, currentPage: number, limit: number } } };

export type PaginatedOffersQueryVariables = Exact<{
  listInputDto: ListInputDto;
}>;


export type PaginatedOffersQuery = { __typename?: 'Query', paginatedOffers: { __typename?: 'PaginatedOffers', data: Array<{ __typename?: 'Offer', id: string, title: string, description?: string | null, offerType: string, discountType: string, discountValue: number, maxDiscountAmount: number, cashbackAmount: number, minOrderAmount: number, usageLimit: number, status: string, startDate: any, endDate: any }>, meta: { __typename?: 'Meta', totalItems: number, totalPages: number, currentPage: number, limit: number } } };

export type DropdownOffersQueryVariables = Exact<{
  listInputDto: ListInputDto;
}>;


export type DropdownOffersQuery = { __typename?: 'Query', dropdownOffers: { __typename?: 'PaginatedOffers', data: Array<{ __typename?: 'Offer', id: string, title: string, description?: string | null, offerType: string, discountType: string, discountValue: number, maxDiscountAmount: number, cashbackAmount: number, minOrderAmount: number, usageLimit: number, status: string, startDate: any, endDate: any }>, meta: { __typename?: 'Meta', totalItems: number, totalPages: number, currentPage: number, limit: number } } };


export const RequestOtpDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RequestOtp"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"otpRequestData"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"OtpRequestDto"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"requestOtp"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"otpRequestData"},"value":{"kind":"Variable","name":{"kind":"Name","value":"otpRequestData"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"otpGeneratedSuccessfully"}},{"kind":"Field","name":{"kind":"Name","value":"otp"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]} as unknown as DocumentNode<RequestOtpMutation, RequestOtpMutationVariables>;
export const LoginDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Login"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"loginData"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ValidateDto"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"login"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"loginData"},"value":{"kind":"Variable","name":{"kind":"Name","value":"loginData"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"accessToken"}}]}}]}}]} as unknown as DocumentNode<LoginMutation, LoginMutationVariables>;
export const DeleteOrganizationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteOrganization"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"deleteOrganizationId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteOrganization"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"deleteOrganizationId"}}}]}]}}]} as unknown as DocumentNode<DeleteOrganizationMutation, DeleteOrganizationMutationVariables>;
export const RegisterDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Register"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"registerData"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"RegisterDto"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"register"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"registerData"},"value":{"kind":"Variable","name":{"kind":"Name","value":"registerData"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"mobileNo"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"}},{"kind":"Field","name":{"kind":"Name","value":"parentId"}}]}}]}}]} as unknown as DocumentNode<RegisterMutation, RegisterMutationVariables>;
export const CreateOrganizationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateOrganization"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"createOrganizationInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateOrganizationDto"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createOrganization"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"createOrganizationInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"createOrganizationInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}}]}}]} as unknown as DocumentNode<CreateOrganizationMutation, CreateOrganizationMutationVariables>;
export const EnableOrganizationStatusDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"EnableOrganizationStatus"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"OrganizationStatusDto"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"enableOrganizationStatus"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}}]}}]} as unknown as DocumentNode<EnableOrganizationStatusMutation, EnableOrganizationStatusMutationVariables>;
export const UpdateOrganizationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateOrganization"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"updateOrganizationInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateOrganizationDto"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateOrganization"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"updateOrganizationInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"updateOrganizationInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}}]}}]} as unknown as DocumentNode<UpdateOrganizationMutation, UpdateOrganizationMutationVariables>;
export const CreateUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateUserDto"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"mobileNo"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"}},{"kind":"Field","name":{"kind":"Name","value":"parentId"}},{"kind":"Field","name":{"kind":"Name","value":"organizationId"}},{"kind":"Field","name":{"kind":"Name","value":"userType"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"deletedAt"}},{"kind":"Field","name":{"kind":"Name","value":"roles"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"permissionCount"}},{"kind":"Field","name":{"kind":"Name","value":"roleType"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"permissions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"appName"}},{"kind":"Field","name":{"kind":"Name","value":"groupName"}},{"kind":"Field","name":{"kind":"Name","value":"module"}},{"kind":"Field","name":{"kind":"Name","value":"action"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}}]}}]}}]}}]} as unknown as DocumentNode<CreateUserMutation, CreateUserMutationVariables>;
export const UpdateProfileDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateProfile"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateUserDto"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateProfile"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"mobileNo"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"}},{"kind":"Field","name":{"kind":"Name","value":"parentId"}},{"kind":"Field","name":{"kind":"Name","value":"organizationId"}},{"kind":"Field","name":{"kind":"Name","value":"userType"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"deletedAt"}}]}}]}}]} as unknown as DocumentNode<UpdateProfileMutation, UpdateProfileMutationVariables>;
export const CreateModuleDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateModule"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"createModuleInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateModuleDto"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createModule"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"createModuleInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"createModuleInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}}]}}]} as unknown as DocumentNode<CreateModuleMutation, CreateModuleMutationVariables>;
export const UpdateModuleDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateModule"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"updateModuleInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateModuleDto"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateModule"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"updateModuleInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"updateModuleInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}}]}}]} as unknown as DocumentNode<UpdateModuleMutation, UpdateModuleMutationVariables>;
export const ChangeModuleStatusDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ChangeModuleStatus"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"updateModuleStatusInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ModuleStatusDto"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"changeModuleStatus"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"updateModuleStatusInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"updateModuleStatusInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}}]}}]} as unknown as DocumentNode<ChangeModuleStatusMutation, ChangeModuleStatusMutationVariables>;
export const DeleteModuleDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteModule"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"deleteModuleId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteModule"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"deleteModuleId"}}}]}]}}]} as unknown as DocumentNode<DeleteModuleMutation, DeleteModuleMutationVariables>;
export const CreateCouponDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateCoupon"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"createCouponInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateCouponDto"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createCoupon"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"createCouponInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"createCouponInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"couponCode"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"discountType"}},{"kind":"Field","name":{"kind":"Name","value":"maxDiscountAmount"}},{"kind":"Field","name":{"kind":"Name","value":"minOrderAmount"}},{"kind":"Field","name":{"kind":"Name","value":"usageLimit"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"startDate"}},{"kind":"Field","name":{"kind":"Name","value":"endDate"}}]}}]}}]} as unknown as DocumentNode<CreateCouponMutation, CreateCouponMutationVariables>;
export const UpdateUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateUserDto"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"mobileNo"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"}},{"kind":"Field","name":{"kind":"Name","value":"parentId"}},{"kind":"Field","name":{"kind":"Name","value":"organizationId"}},{"kind":"Field","name":{"kind":"Name","value":"userType"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"deletedAt"}},{"kind":"Field","name":{"kind":"Name","value":"roles"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"roleType"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}}]}}]}}]} as unknown as DocumentNode<UpdateUserMutation, UpdateUserMutationVariables>;
export const DeleteUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"deleteUserId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"deleteUserId"}}}]}]}}]} as unknown as DocumentNode<DeleteUserMutation, DeleteUserMutationVariables>;
export const ChangeUserStatusDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ChangeUserStatus"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UserStatusDto"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"changeUserStatus"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"mobileNo"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"}},{"kind":"Field","name":{"kind":"Name","value":"parentId"}},{"kind":"Field","name":{"kind":"Name","value":"organizationId"}},{"kind":"Field","name":{"kind":"Name","value":"userType"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"deletedAt"}}]}}]}}]} as unknown as DocumentNode<ChangeUserStatusMutation, ChangeUserStatusMutationVariables>;
export const UpdateCouponDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateCoupon"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"updateCouponInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateCouponDto"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateCoupon"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"updateCouponInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"updateCouponInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"couponCode"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"discountType"}},{"kind":"Field","name":{"kind":"Name","value":"maxDiscountAmount"}},{"kind":"Field","name":{"kind":"Name","value":"minOrderAmount"}},{"kind":"Field","name":{"kind":"Name","value":"usageLimit"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"startDate"}},{"kind":"Field","name":{"kind":"Name","value":"endDate"}}]}}]}}]} as unknown as DocumentNode<UpdateCouponMutation, UpdateCouponMutationVariables>;
export const ChangeCouponStatusDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ChangeCouponStatus"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"updateCouponStatusInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CouponStatusDto"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"changeCouponStatus"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"updateCouponStatusInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"updateCouponStatusInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"couponCode"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"discountType"}},{"kind":"Field","name":{"kind":"Name","value":"maxDiscountAmount"}},{"kind":"Field","name":{"kind":"Name","value":"minOrderAmount"}},{"kind":"Field","name":{"kind":"Name","value":"usageLimit"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"startDate"}},{"kind":"Field","name":{"kind":"Name","value":"endDate"}}]}}]}}]} as unknown as DocumentNode<ChangeCouponStatusMutation, ChangeCouponStatusMutationVariables>;
export const DeleteCouponDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteCoupon"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"deleteCouponId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteCoupon"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"deleteCouponId"}}}]}]}}]} as unknown as DocumentNode<DeleteCouponMutation, DeleteCouponMutationVariables>;
export const PaginatedPackagesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"PaginatedPackages"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"listInputDto"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ListInputDTO"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"paginatedPackages"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"ListInputDTO"},"value":{"kind":"Variable","name":{"kind":"Name","value":"listInputDto"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"meta"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"totalItems"}},{"kind":"Field","name":{"kind":"Name","value":"totalPages"}},{"kind":"Field","name":{"kind":"Name","value":"currentPage"}},{"kind":"Field","name":{"kind":"Name","value":"limit"}}]}},{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"discountedPrice"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"modules"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}},{"kind":"Field","name":{"kind":"Name","value":"offer"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"offerType"}},{"kind":"Field","name":{"kind":"Name","value":"discountType"}},{"kind":"Field","name":{"kind":"Name","value":"discountValue"}},{"kind":"Field","name":{"kind":"Name","value":"maxDiscountAmount"}},{"kind":"Field","name":{"kind":"Name","value":"cashbackAmount"}},{"kind":"Field","name":{"kind":"Name","value":"minOrderAmount"}},{"kind":"Field","name":{"kind":"Name","value":"usageLimit"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"startDate"}},{"kind":"Field","name":{"kind":"Name","value":"endDate"}}]}},{"kind":"Field","name":{"kind":"Name","value":"offerId"}}]}}]}}]}}]} as unknown as DocumentNode<PaginatedPackagesQuery, PaginatedPackagesQueryVariables>;
export const UpdatePackageDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdatePackage"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"updatePackageInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdatePackageDto"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updatePackage"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"updatePackageInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"updatePackageInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"discountedPrice"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"modules"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}},{"kind":"Field","name":{"kind":"Name","value":"offer"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"offerType"}},{"kind":"Field","name":{"kind":"Name","value":"discountType"}},{"kind":"Field","name":{"kind":"Name","value":"discountValue"}},{"kind":"Field","name":{"kind":"Name","value":"maxDiscountAmount"}},{"kind":"Field","name":{"kind":"Name","value":"cashbackAmount"}},{"kind":"Field","name":{"kind":"Name","value":"minOrderAmount"}},{"kind":"Field","name":{"kind":"Name","value":"usageLimit"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"startDate"}},{"kind":"Field","name":{"kind":"Name","value":"endDate"}}]}},{"kind":"Field","name":{"kind":"Name","value":"offerId"}}]}}]}}]} as unknown as DocumentNode<UpdatePackageMutation, UpdatePackageMutationVariables>;
export const CreatePackageDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreatePackage"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"createPackageInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreatePackageDto"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createPackage"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"createPackageInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"createPackageInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"discountedPrice"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"offerId"}}]}}]}}]} as unknown as DocumentNode<CreatePackageMutation, CreatePackageMutationVariables>;
export const PaginatedOrganizationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"PaginatedOrganization"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"listInputDto"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ListInputDTO"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"paginatedOrganization"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"ListInputDTO"},"value":{"kind":"Variable","name":{"kind":"Name","value":"listInputDto"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"meta"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"totalItems"}},{"kind":"Field","name":{"kind":"Name","value":"totalPages"}},{"kind":"Field","name":{"kind":"Name","value":"currentPage"}},{"kind":"Field","name":{"kind":"Name","value":"limit"}}]}},{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}}]}}]}}]} as unknown as DocumentNode<PaginatedOrganizationQuery, PaginatedOrganizationQueryVariables>;
export const ModulesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Modules"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"permissionGroup"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"modules"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"groups"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"permissions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"action"}},{"kind":"Field","name":{"kind":"Name","value":"appName"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"groupName"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"module"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]} as unknown as DocumentNode<ModulesQuery, ModulesQueryVariables>;
export const PaginatedProjectsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"PaginatedProjects"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"listInputDto"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ListInputDTO"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"paginatedProjects"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"ListInputDTO"},"value":{"kind":"Variable","name":{"kind":"Name","value":"listInputDto"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"organizationId"}}]}}]}}]}}]} as unknown as DocumentNode<PaginatedProjectsQuery, PaginatedProjectsQueryVariables>;
export const PaginatedUsersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"PaginatedUsers"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"listInputDto"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ListInputDTO"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"paginatedUsers"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"ListInputDTO"},"value":{"kind":"Variable","name":{"kind":"Name","value":"listInputDto"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"meta"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"totalItems"}},{"kind":"Field","name":{"kind":"Name","value":"totalPages"}},{"kind":"Field","name":{"kind":"Name","value":"currentPage"}},{"kind":"Field","name":{"kind":"Name","value":"limit"}}]}},{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"avatar"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"deletedAt"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"mobileNo"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"organizationId"}},{"kind":"Field","name":{"kind":"Name","value":"parentId"}},{"kind":"Field","name":{"kind":"Name","value":"roles"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"roleType"}}]}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"userType"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]}}]} as unknown as DocumentNode<PaginatedUsersQuery, PaginatedUsersQueryVariables>;
export const PaginatedRolesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"PaginatedRoles"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"listInputDto"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ListInputDTO"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"paginatedRoles"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"ListInputDTO"},"value":{"kind":"Variable","name":{"kind":"Name","value":"listInputDto"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"meta"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"totalItems"}},{"kind":"Field","name":{"kind":"Name","value":"totalPages"}},{"kind":"Field","name":{"kind":"Name","value":"currentPage"}},{"kind":"Field","name":{"kind":"Name","value":"limit"}}]}},{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"roleType"}},{"kind":"Field","name":{"kind":"Name","value":"permissionCount"}}]}}]}}]}}]} as unknown as DocumentNode<PaginatedRolesQuery, PaginatedRolesQueryVariables>;
export const FindUserByIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"FindUserById"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"findUserByIdId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"findUserById"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"findUserByIdId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"mobileNo"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"}},{"kind":"Field","name":{"kind":"Name","value":"parentId"}},{"kind":"Field","name":{"kind":"Name","value":"organizationId"}},{"kind":"Field","name":{"kind":"Name","value":"userType"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"deletedAt"}}]}}]}}]} as unknown as DocumentNode<FindUserByIdQuery, FindUserByIdQueryVariables>;
export const PaginatedModulesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"PaginatedModules"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"listInputDto"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ListInputDTO"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"paginatedModules"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"ListInputDTO"},"value":{"kind":"Variable","name":{"kind":"Name","value":"listInputDto"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}},{"kind":"Field","name":{"kind":"Name","value":"meta"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"totalItems"}},{"kind":"Field","name":{"kind":"Name","value":"totalPages"}},{"kind":"Field","name":{"kind":"Name","value":"currentPage"}},{"kind":"Field","name":{"kind":"Name","value":"limit"}}]}}]}}]}}]} as unknown as DocumentNode<PaginatedModulesQuery, PaginatedModulesQueryVariables>;
export const PaginatedCouponsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"PaginatedCoupons"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"listInputDto"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ListInputDTO"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"paginatedCoupons"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"ListInputDTO"},"value":{"kind":"Variable","name":{"kind":"Name","value":"listInputDto"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"couponCode"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"discountType"}},{"kind":"Field","name":{"kind":"Name","value":"maxDiscountAmount"}},{"kind":"Field","name":{"kind":"Name","value":"minOrderAmount"}},{"kind":"Field","name":{"kind":"Name","value":"usageLimit"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"startDate"}},{"kind":"Field","name":{"kind":"Name","value":"endDate"}}]}},{"kind":"Field","name":{"kind":"Name","value":"meta"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"totalItems"}},{"kind":"Field","name":{"kind":"Name","value":"totalPages"}},{"kind":"Field","name":{"kind":"Name","value":"currentPage"}},{"kind":"Field","name":{"kind":"Name","value":"limit"}}]}}]}}]}}]} as unknown as DocumentNode<PaginatedCouponsQuery, PaginatedCouponsQueryVariables>;
export const PaginatedSubscriptionsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"PaginatedSubscriptions"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"listInputDto"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ListInputDTO"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"paginatedSubscriptions"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"ListInputDTO"},"value":{"kind":"Variable","name":{"kind":"Name","value":"listInputDto"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"duration"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"plans"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"duration"}},{"kind":"Field","name":{"kind":"Name","value":"discountedPrice"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"couponId"}},{"kind":"Field","name":{"kind":"Name","value":"offerId"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"meta"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"totalItems"}},{"kind":"Field","name":{"kind":"Name","value":"totalPages"}},{"kind":"Field","name":{"kind":"Name","value":"currentPage"}},{"kind":"Field","name":{"kind":"Name","value":"limit"}}]}}]}}]}}]} as unknown as DocumentNode<PaginatedSubscriptionsQuery, PaginatedSubscriptionsQueryVariables>;
export const PaginatedOffersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"PaginatedOffers"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"listInputDto"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ListInputDTO"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"paginatedOffers"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"ListInputDTO"},"value":{"kind":"Variable","name":{"kind":"Name","value":"listInputDto"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"offerType"}},{"kind":"Field","name":{"kind":"Name","value":"discountType"}},{"kind":"Field","name":{"kind":"Name","value":"discountValue"}},{"kind":"Field","name":{"kind":"Name","value":"maxDiscountAmount"}},{"kind":"Field","name":{"kind":"Name","value":"cashbackAmount"}},{"kind":"Field","name":{"kind":"Name","value":"minOrderAmount"}},{"kind":"Field","name":{"kind":"Name","value":"usageLimit"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"startDate"}},{"kind":"Field","name":{"kind":"Name","value":"endDate"}}]}},{"kind":"Field","name":{"kind":"Name","value":"meta"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"totalItems"}},{"kind":"Field","name":{"kind":"Name","value":"totalPages"}},{"kind":"Field","name":{"kind":"Name","value":"currentPage"}},{"kind":"Field","name":{"kind":"Name","value":"limit"}}]}}]}}]}}]} as unknown as DocumentNode<PaginatedOffersQuery, PaginatedOffersQueryVariables>;
export const DropdownOffersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"DropdownOffers"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"listInputDto"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ListInputDTO"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"dropdownOffers"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"ListInputDTO"},"value":{"kind":"Variable","name":{"kind":"Name","value":"listInputDto"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"offerType"}},{"kind":"Field","name":{"kind":"Name","value":"discountType"}},{"kind":"Field","name":{"kind":"Name","value":"discountValue"}},{"kind":"Field","name":{"kind":"Name","value":"maxDiscountAmount"}},{"kind":"Field","name":{"kind":"Name","value":"cashbackAmount"}},{"kind":"Field","name":{"kind":"Name","value":"minOrderAmount"}},{"kind":"Field","name":{"kind":"Name","value":"usageLimit"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"startDate"}},{"kind":"Field","name":{"kind":"Name","value":"endDate"}}]}},{"kind":"Field","name":{"kind":"Name","value":"meta"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"totalItems"}},{"kind":"Field","name":{"kind":"Name","value":"totalPages"}},{"kind":"Field","name":{"kind":"Name","value":"currentPage"}},{"kind":"Field","name":{"kind":"Name","value":"limit"}}]}}]}}]}}]} as unknown as DocumentNode<DropdownOffersQuery, DropdownOffersQueryVariables>;