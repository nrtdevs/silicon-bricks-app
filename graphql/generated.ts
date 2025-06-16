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
  JSONObject: { input: any; output: any; }
};

export type About = {
  __typename?: 'About';
  content?: Maybe<Scalars['String']['output']>;
  contentJson?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  imageUrl?: Maybe<Scalars['String']['output']>;
  slug: Scalars['String']['output'];
  title: Scalars['String']['output'];
};

export type Activity = {
  __typename?: 'Activity';
  activity: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  createdBy: User;
  createdByUserId: Scalars['Int']['output'];
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  ipAddress: Scalars['String']['output'];
  module: Scalars['String']['output'];
  moduleId?: Maybe<Scalars['Int']['output']>;
  organization: Organization;
  updatedAt: Scalars['DateTime']['output'];
  userAgent: Scalars['String']['output'];
};

export type AnalyticsFilters = {
  endDate?: InputMaybe<Scalars['String']['input']>;
  expenseType?: InputMaybe<Scalars['String']['input']>;
  startDate?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
  vehicleId?: InputMaybe<Scalars['Int']['input']>;
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

export type ApplicationModuleArray = {
  __typename?: 'ApplicationModuleArray';
  data: Array<ApplicationModule>;
};

export type ApplicationModuleUnion = ApplicationModule | ApplicationModuleArray;

export type Breakdown = {
  __typename?: 'Breakdown';
  breakdownDate: Scalars['DateTime']['output'];
  breakdownDescription?: Maybe<Scalars['String']['output']>;
  breakdownLocation: Scalars['String']['output'];
  breakdownType?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  createdBy?: Maybe<User>;
  createdById?: Maybe<Scalars['Float']['output']>;
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['ID']['output'];
  isIndividualDeleted: Scalars['Boolean']['output'];
  latitude: Scalars['String']['output'];
  longitude: Scalars['String']['output'];
  media: Array<BreakdownMedia>;
  organizationBy: Organization;
  organizationId: Scalars['Int']['output'];
  status: Scalars['String']['output'];
  statuses: Array<BreakdownStatus>;
  updatedAt: Scalars['DateTime']['output'];
  vehicle: Vehicle;
  vehicleId: Scalars['Int']['output'];
};

export type BreakdownFilterType = {
  breakdownType?: InputMaybe<Scalars['String']['input']>;
  endDate?: InputMaybe<Scalars['String']['input']>;
  startDate?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<Breakdown_Status>;
  vehicleId?: InputMaybe<Scalars['Int']['input']>;
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

export type BreakdownServiceAssignment = {
  __typename?: 'BreakdownServiceAssignment';
  breakdown: Breakdown;
  breakdownId: Scalars['Int']['output'];
  createdAt: Scalars['DateTime']['output'];
  createdBy?: Maybe<User>;
  createdById?: Maybe<Scalars['Float']['output']>;
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  endDate?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['ID']['output'];
  isIndividualDeleted: Scalars['Boolean']['output'];
  organizationBy: Organization;
  organizationId: Scalars['Int']['output'];
  scheduledDate: Scalars['DateTime']['output'];
  serviceCenter: ServiceCenter;
  serviceCenterId: Scalars['Int']['output'];
  status: Scalars['String']['output'];
  statuses: Array<BreakdownServiceStatus>;
  updatedAt: Scalars['DateTime']['output'];
  vehicle: Vehicle;
  vehicleId: Scalars['Int']['output'];
};

export type BreakdownServiceFilterType = {
  breakdownId?: InputMaybe<Scalars['Int']['input']>;
  breakdownType?: InputMaybe<Scalars['String']['input']>;
  endDate?: InputMaybe<Scalars['String']['input']>;
  serviceCenterId?: InputMaybe<Scalars['Int']['input']>;
  startDate?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<Breakdown_Service_Status>;
  vehicleId?: InputMaybe<Scalars['Int']['input']>;
};

export type BreakdownServiceStatus = {
  __typename?: 'BreakdownServiceStatus';
  actionDate: Scalars['DateTime']['output'];
  approver?: Maybe<User>;
  approverId?: Maybe<Scalars['Float']['output']>;
  breakdownService: BreakdownServiceAssignment;
  breakdownServiceId: Scalars['Int']['output'];
  createdAt: Scalars['DateTime']['output'];
  createdBy?: Maybe<User>;
  createdById?: Maybe<Scalars['Float']['output']>;
  id: Scalars['ID']['output'];
  remark: Scalars['String']['output'];
  status: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type BreakdownServiceStatusDto = {
  approverId?: InputMaybe<Scalars['Float']['input']>;
  assignId?: InputMaybe<Scalars['Float']['input']>;
  id: Scalars['Float']['input'];
  remark: Scalars['String']['input'];
  status: Breakdown_Service_Status;
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

export type Contact = {
  __typename?: 'Contact';
  email: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  message?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  phoneNo: Scalars['Float']['output'];
  subject: Scalars['String']['output'];
};

export type Coupon = {
  __typename?: 'Coupon';
  couponCode: Scalars['String']['output'];
  description?: Maybe<Scalars['String']['output']>;
  discountValue?: Maybe<Scalars['Float']['output']>;
  endDate: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  minOrderAmount?: Maybe<Scalars['Float']['output']>;
  startDate: Scalars['DateTime']['output'];
  status: Scalars['String']['output'];
  usageLimit: Scalars['Float']['output'];
};

export type CouponArray = {
  __typename?: 'CouponArray';
  data: Array<Coupon>;
};

export type CouponOrCoupons = Coupon | CouponArray;

/** Coupon Status */
export enum CouponStatus {
  Active = 'active',
  Expired = 'expired',
  Inactive = 'inactive',
  Used = 'used'
}

export type CouponStatusDto = {
  ids: Array<Scalars['Float']['input']>;
  status: CouponStatus;
};

export type CreateAboutDto = {
  content: Scalars['String']['input'];
  contentJson: Scalars['String']['input'];
  description: Scalars['String']['input'];
  imageUrl: Scalars['String']['input'];
  title: Scalars['String']['input'];
};

export type CreateAssignServiceCenterDto = {
  breakdownId: Scalars['Int']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
  scheduledDate: Scalars['String']['input'];
  serviceCenterId: Scalars['Int']['input'];
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

export type CreateContactDto = {
  email: Scalars['String']['input'];
  message?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  phoneNo: Scalars['Float']['input'];
  subject: Scalars['String']['input'];
};

export type CreateCouponDto = {
  couponCode: Scalars['String']['input'];
  description: Scalars['String']['input'];
  discountValue: Scalars['Float']['input'];
  endDate: Scalars['String']['input'];
  minOrderAmount: Scalars['Float']['input'];
  startDate: Scalars['String']['input'];
  usageLimit: Scalars['Float']['input'];
};

export type CreateFollowUpDto = {
  body: Scalars['String']['input'];
  followUpId?: InputMaybe<Scalars['Float']['input']>;
  subject: Scalars['String']['input'];
  taskId?: InputMaybe<Scalars['Float']['input']>;
  userId?: InputMaybe<Scalars['Float']['input']>;
};

export type CreateMeetingDto = {
  attendees?: InputMaybe<Scalars['JSON']['input']>;
  endTime: Scalars['String']['input'];
  meetingAgenda?: InputMaybe<Scalars['String']['input']>;
  meetingDate: Scalars['DateTime']['input'];
  meetingReference: Scalars['String']['input'];
  meetingTypeId: Scalars['Float']['input'];
  meetingUrl?: InputMaybe<Scalars['String']['input']>;
  meetingVenueId?: InputMaybe<Scalars['Float']['input']>;
  parentMeetingId?: InputMaybe<Scalars['Float']['input']>;
  projectId?: InputMaybe<Scalars['Float']['input']>;
  startTime: Scalars['String']['input'];
  title: Scalars['String']['input'];
  uploadDoc?: InputMaybe<Scalars['String']['input']>;
};

export type CreateMeetingTaskDto = {
  assigneeId?: InputMaybe<Scalars['Float']['input']>;
  comment?: InputMaybe<Scalars['String']['input']>;
  completePercent?: InputMaybe<Scalars['Float']['input']>;
  completedDate?: InputMaybe<Scalars['DateTime']['input']>;
  dueDate: Scalars['DateTime']['input'];
  meetingId?: InputMaybe<Scalars['Float']['input']>;
  milestoneId?: InputMaybe<Scalars['Float']['input']>;
  notesId?: InputMaybe<Scalars['Float']['input']>;
  openedDate: Scalars['DateTime']['input'];
  parentTaskId?: InputMaybe<Scalars['Float']['input']>;
  priority: Scalars['String']['input'];
  projectId?: InputMaybe<Scalars['Float']['input']>;
  projectName?: InputMaybe<Scalars['String']['input']>;
  task?: InputMaybe<Scalars['String']['input']>;
  totalTaskCompleteMilestone?: InputMaybe<Scalars['Float']['input']>;
  weightType?: InputMaybe<Scalars['String']['input']>;
};

export type CreateMeetingTypeDto = {
  name: Scalars['String']['input'];
};

export type CreateMeetingVenueDto = {
  address: Scalars['String']['input'];
  contactNumber: Scalars['Float']['input'];
  contactPerson: Scalars['String']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
};

export type CreateModuleDto = {
  description: Scalars['String']['input'];
  name: Scalars['String']['input'];
};

export type CreateMultipleOrderInput = {
  amount: Scalars['Float']['input'];
  couponCode?: InputMaybe<Scalars['String']['input']>;
  duration: Scalars['Float']['input'];
  planIds: Array<Scalars['Int']['input']>;
};

export type CreateNotePadDto = {
  notesField?: InputMaybe<Scalars['String']['input']>;
};

export type CreateNotesDto = {
  decision?: InputMaybe<Scalars['String']['input']>;
  meetingId?: InputMaybe<Scalars['Float']['input']>;
  notes?: InputMaybe<Scalars['String']['input']>;
  uploadDoc?: InputMaybe<Scalars['String']['input']>;
};

export type CreateOfferDto = {
  description: Scalars['String']['input'];
  discountPercent?: InputMaybe<Scalars['Float']['input']>;
  discountValue?: InputMaybe<Scalars['Float']['input']>;
  endDate: Scalars['String']['input'];
  offerType?: InputMaybe<Scalars['String']['input']>;
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
  discountedPrice?: InputMaybe<Scalars['Float']['input']>;
  moduleIds: Array<Scalars['Int']['input']>;
  name: Scalars['String']['input'];
  offerDescription?: InputMaybe<Scalars['String']['input']>;
  offerExpiryDate?: InputMaybe<Scalars['String']['input']>;
  offerType?: InputMaybe<Scalars['String']['input']>;
  price: Scalars['Float']['input'];
};

export type CreatePermissionDto = {
  action: Scalars['String']['input'];
  appName: AppName;
  description: Scalars['String']['input'];
  module: Scalars['String']['input'];
};

export type CreatePlanDto = {
  couponCode?: InputMaybe<Scalars['String']['input']>;
  description: Scalars['String']['input'];
  discountedPrice?: InputMaybe<Scalars['Float']['input']>;
  duration: Scalars['Float']['input'];
  name: Scalars['String']['input'];
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

export type CreateServiceCenterDto = {
  address: Scalars['String']['input'];
  contactNo?: InputMaybe<Scalars['Float']['input']>;
  latitude: Scalars['String']['input'];
  longitude: Scalars['String']['input'];
  name: Scalars['String']['input'];
  status: ServiceCenterStatus;
  type: ServiceCenterType;
};

export type CreateSubscriptionDto = {
  couponCode?: InputMaybe<Scalars['String']['input']>;
  discountedPrice?: InputMaybe<Scalars['Float']['input']>;
  duration: Scalars['Float']['input'];
  name: Scalars['String']['input'];
  planIds: Array<Scalars['Int']['input']>;
  price: Scalars['Float']['input'];
};

export type CreateUserDto = {
  avatar?: InputMaybe<Scalars['String']['input']>;
  designation: Designation;
  email: Scalars['String']['input'];
  mobileNo: Scalars['Float']['input'];
  name: Scalars['String']['input'];
  parentId?: InputMaybe<Scalars['Float']['input']>;
  roleIds: Array<Scalars['Int']['input']>;
  userType?: InputMaybe<UserType>;
};

export type CreateVehicleDto = {
  avatar?: InputMaybe<Scalars['String']['input']>;
  chassisNumber: Scalars['String']['input'];
  color: Scalars['String']['input'];
  insurance: Scalars['Boolean']['input'];
  insuranceValidTill?: InputMaybe<Scalars['String']['input']>;
  maintenanceHistory?: InputMaybe<Scalars['String']['input']>;
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
  uploadDoc?: InputMaybe<Scalars['String']['input']>;
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

export type DashboardAnalyticsResponse = {
  __typename?: 'DashboardAnalyticsResponse';
  byType: ExpenseByTypeResponse;
  monthlyTrends: Array<MonthlyTrendItem>;
  recentExpenses: Array<TopExpenseItem>;
  summary: ExpenseSummaryResponse;
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
  pageCount?: Maybe<Scalars['Int']['output']>;
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

/** User Designation Hierarchy */
export enum Designation {
  Ceo = 'CEO',
  Cto = 'CTO',
  Employee = 'EMPLOYEE',
  Hr = 'HR',
  Manager = 'MANAGER',
  SuperAdmin = 'SUPER_ADMIN',
  TeamLead = 'TEAM_LEAD'
}

export type DynamicPermissionsDto = {
  __typename?: 'DynamicPermissionsDto';
  apps: Array<AppPermissionsDto>;
};

export type ExpenseByTypeItem = {
  __typename?: 'ExpenseByTypeItem';
  averageAmount: Scalars['Float']['output'];
  expenseCount: Scalars['Int']['output'];
  expenseType: Scalars['String']['output'];
  percentage: Scalars['Float']['output'];
  totalAmount: Scalars['Float']['output'];
};

export type ExpenseByTypeResponse = {
  __typename?: 'ExpenseByTypeResponse';
  data: Array<ExpenseByTypeItem>;
  totalAmount: Scalars['Float']['output'];
  totalCount: Scalars['Int']['output'];
};

export type ExpenseFilterType = {
  breakDownId?: InputMaybe<Scalars['Int']['input']>;
  endDate?: InputMaybe<Scalars['String']['input']>;
  expenseType?: InputMaybe<Scalars['String']['input']>;
  startDate?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
  vehicleId?: InputMaybe<Scalars['Int']['input']>;
};

export type ExpenseSummaryResponse = {
  __typename?: 'ExpenseSummaryResponse';
  averageExpense: Scalars['Float']['output'];
  expenseCount: Scalars['Int']['output'];
  periodComparison?: Maybe<PeriodComparison>;
  totalAmount: Scalars['Float']['output'];
  totalExpenses: Scalars['Int']['output'];
};

export type FilterMeeting = {
  endTime?: InputMaybe<Scalars['String']['input']>;
  meetingAgenda?: InputMaybe<Scalars['String']['input']>;
  meetingDate?: InputMaybe<Scalars['DateTime']['input']>;
  startTime?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type FilterMeetingDto = {
  endDate?: InputMaybe<Scalars['String']['input']>;
  startDate?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
};

export type FilterMeetingMonthYearDto = {
  month: Scalars['Float']['input'];
  year: Scalars['Float']['input'];
};

export type FilterMeetingTask = {
  completedDate?: InputMaybe<Scalars['DateTime']['input']>;
  dueDate?: InputMaybe<Scalars['DateTime']['input']>;
  openedDate?: InputMaybe<Scalars['DateTime']['input']>;
  priority?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
  task?: InputMaybe<Scalars['String']['input']>;
  weightType?: InputMaybe<Scalars['String']['input']>;
};

export type FilterMeetingType = {
  name?: InputMaybe<Scalars['String']['input']>;
};

export type FilterMeetingVenue = {
  address?: InputMaybe<Scalars['String']['input']>;
  contactNumber?: InputMaybe<Scalars['Float']['input']>;
  contactPerson?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};

export type FilterNotesData = {
  decision?: InputMaybe<Scalars['String']['input']>;
  notes?: InputMaybe<Scalars['String']['input']>;
};

export type FollowUp = {
  __typename?: 'FollowUp';
  body?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  createdBy: User;
  createdById: Scalars['Float']['output'];
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  followUpId?: Maybe<Scalars['Float']['output']>;
  id: Scalars['Float']['output'];
  organization: Organization;
  subject?: Maybe<Scalars['String']['output']>;
  task?: Maybe<MeetingTask>;
  updatedAt: Scalars['DateTime']['output'];
  userId?: Maybe<Scalars['Float']['output']>;
};

export type Group = {
  __typename?: 'Group';
  name: Scalars['String']['output'];
  permissions: Array<Permissions>;
};

export type InputPermissionSlugDto = {
  permissionSlug: Scalars['String']['input'];
  status?: InputMaybe<Scalars['String']['input']>;
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

export type Logs = {
  __typename?: 'Logs';
  action: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  description: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  ipAddress: Scalars['String']['output'];
  module: Scalars['String']['output'];
  organization?: Maybe<Organization>;
  organizationId: Scalars['Int']['output'];
  updatedAt: Scalars['DateTime']['output'];
  user: User;
  userAgent: Scalars['String']['output'];
  userId: Scalars['Int']['output'];
};

export type MarkAllAsReadResponse = {
  __typename?: 'MarkAllAsReadResponse';
  affected: Scalars['Float']['output'];
};

export type MarkAsReadInput = {
  id: Scalars['Float']['input'];
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
  attendees?: Maybe<Scalars['JSON']['output']>;
  attendeesNames?: Maybe<Array<Scalars['String']['output']>>;
  children?: Maybe<Array<Meeting>>;
  createdAt: Scalars['DateTime']['output'];
  createdBy: User;
  createdByUserId: Scalars['ID']['output'];
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  endTime: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  meetingAgenda?: Maybe<Scalars['String']['output']>;
  meetingDate: Scalars['DateTime']['output'];
  meetingReference: Scalars['String']['output'];
  meetingType: MeetingType;
  meetingTypeId: Scalars['Float']['output'];
  meetingUrl?: Maybe<Scalars['String']['output']>;
  meetingVenue?: Maybe<MeetingVenue>;
  meetingVenueId?: Maybe<Scalars['Float']['output']>;
  notes?: Maybe<Array<Notes>>;
  organization: Organization;
  parentMeeting?: Maybe<Meeting>;
  parentMeetingId?: Maybe<Scalars['Float']['output']>;
  projectId?: Maybe<Scalars['Float']['output']>;
  projectName?: Maybe<Scalars['String']['output']>;
  startTime: Scalars['String']['output'];
  status: Scalars['String']['output'];
  task?: Maybe<Array<MeetingTask>>;
  title: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
  uploadDoc?: Maybe<Scalars['String']['output']>;
};

export type MeetingArray = {
  __typename?: 'MeetingArray';
  data: Array<Meeting>;
};

export type MeetingDateCount = {
  __typename?: 'MeetingDateCount';
  count: Scalars['Float']['output'];
  date: Scalars['String']['output'];
};

export type MeetingFiltersDto = {
  endDate?: InputMaybe<Scalars['DateTime']['input']>;
  startDate?: InputMaybe<Scalars['DateTime']['input']>;
};

export type MeetingNotification = {
  __typename?: 'MeetingNotification';
  actionUrl?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  createdBy?: Maybe<User>;
  createdByUserId?: Maybe<Scalars['Float']['output']>;
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  entityId?: Maybe<Scalars['Float']['output']>;
  id: Scalars['ID']['output'];
  isRead: Scalars['Boolean']['output'];
  message: Scalars['String']['output'];
  module: Scalars['String']['output'];
  organization: Organization;
  organizationId: Scalars['Int']['output'];
  readAt?: Maybe<Scalars['DateTime']['output']>;
  title: Scalars['String']['output'];
  userBy?: Maybe<User>;
  userId?: Maybe<Scalars['Float']['output']>;
};

export type MeetingOrMeetings = Meeting | MeetingArray;

/** Meeting  Status */
export enum MeetingStatus {
  Active = 'active',
  Completed = 'completed',
  Inactive = 'inactive'
}

export type MeetingStatusDto = {
  ids: Array<Scalars['Float']['input']>;
  status: MeetingStatus;
};

export type MeetingTask = {
  __typename?: 'MeetingTask';
  assigneeId?: Maybe<Scalars['Float']['output']>;
  assigneeName?: Maybe<Scalars['String']['output']>;
  comment?: Maybe<Scalars['String']['output']>;
  completePercent?: Maybe<Scalars['Float']['output']>;
  completedDate?: Maybe<Scalars['DateTime']['output']>;
  createdAt: Scalars['DateTime']['output'];
  createdBy: User;
  createdByUserId: Scalars['ID']['output'];
  dueDate: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  meetingId?: Maybe<Scalars['Float']['output']>;
  meetingTask?: Maybe<Meeting>;
  milestone?: Maybe<Milestone>;
  milestoneId?: Maybe<Scalars['Float']['output']>;
  notesId?: Maybe<Scalars['Float']['output']>;
  notesTask?: Maybe<Notes>;
  openedDate: Scalars['DateTime']['output'];
  organization: Organization;
  ownerId?: Maybe<Scalars['Float']['output']>;
  ownerName?: Maybe<Scalars['String']['output']>;
  parentTask?: Maybe<MeetingTask>;
  parentTaskId?: Maybe<Scalars['Float']['output']>;
  priority: Scalars['String']['output'];
  projectId?: Maybe<Scalars['Float']['output']>;
  projectName?: Maybe<Scalars['String']['output']>;
  remarks?: Maybe<Scalars['String']['output']>;
  status: Scalars['String']['output'];
  subtasks?: Maybe<Array<MeetingTask>>;
  task?: Maybe<Scalars['String']['output']>;
  totalTaskComplete?: Maybe<Scalars['Float']['output']>;
  totalTaskCompleteMilestone?: Maybe<Scalars['Float']['output']>;
  weightType?: Maybe<Scalars['String']['output']>;
};

export type MeetingTaskArray = {
  __typename?: 'MeetingTaskArray';
  data: Array<MeetingTask>;
};

export type MeetingTaskFiltersDto = {
  endDate?: InputMaybe<Scalars['DateTime']['input']>;
  startDate?: InputMaybe<Scalars['DateTime']['input']>;
};

export type MeetingTaskOrMeetingTasks = MeetingTask | MeetingTaskArray;

/** Meeting Task Status */
export enum MeetingTaskStatus {
  Approved = 'approved',
  Completed = 'completed',
  InProgress = 'in_progress',
  NotStarted = 'not_started',
  Rejected = 'rejected'
}

export type MeetingTaskStatusDto = {
  ids: Array<Scalars['Float']['input']>;
  remarks?: InputMaybe<Scalars['String']['input']>;
  status: MeetingTaskStatus;
  totalTaskComplete?: InputMaybe<Scalars['Float']['input']>;
};

export type MeetingType = {
  __typename?: 'MeetingType';
  createdAt: Scalars['DateTime']['output'];
  createdBy: User;
  createdByUserId: Scalars['ID']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  organization: Organization;
};

export type MeetingVenue = {
  __typename?: 'MeetingVenue';
  address?: Maybe<Scalars['String']['output']>;
  contactNumber?: Maybe<Scalars['Float']['output']>;
  contactPerson?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  createdBy: User;
  createdByUserId: Scalars['ID']['output'];
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  organization: Organization;
};

export type Meta = {
  __typename?: 'Meta';
  currentPage: Scalars['Int']['output'];
  limit: Scalars['Int']['output'];
  totalItems: Scalars['Int']['output'];
  totalPages: Scalars['Int']['output'];
};

export type Milestone = {
  __typename?: 'Milestone';
  createdBy: User;
  endDate: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  organization: Organization;
  projectId: Scalars['Float']['output'];
  projectName?: Maybe<Scalars['String']['output']>;
  startDate: Scalars['DateTime']['output'];
  status: Scalars['String']['output'];
  totalTaskCompleteMilestone?: Maybe<Scalars['Float']['output']>;
};

export type MilestoneDto = {
  endDate: Scalars['DateTime']['input'];
  name: Scalars['String']['input'];
  projectId: Scalars['Float']['input'];
  startDate: Scalars['DateTime']['input'];
};

export type Module = {
  __typename?: 'Module';
  groups: Array<Group>;
  name: Scalars['String']['output'];
};

export type ModuleStatusDto = {
  ids: Array<Scalars['Float']['input']>;
  status: CustomStatus;
};

export type MonthlyTrendItem = {
  __typename?: 'MonthlyTrendItem';
  averageAmount: Scalars['Float']['output'];
  expenseCount: Scalars['Int']['output'];
  month: Scalars['String']['output'];
  monthName: Scalars['String']['output'];
  totalAmount: Scalars['Float']['output'];
  year: Scalars['Int']['output'];
};

export type MonthlyTrendResponse = {
  __typename?: 'MonthlyTrendResponse';
  data: Array<MonthlyTrendItem>;
  growthRate: Scalars['Float']['output'];
  trend: Scalars['String']['output'];
};

export type MultipleDeviceNotificationDto = {
  body: Scalars['String']['input'];
  icon: Scalars['String']['input'];
  title: Scalars['String']['input'];
  tokens: Array<Scalars['String']['input']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  addMediaToBreakdown: Array<BreakdownMedia>;
  applyCouponToPlan: Plan;
  assignModuleToPkg: Package;
  assignPermissionsToRole: Role;
  assignPlanToSubscription: Subscriptions;
  assignRoleToUser: User;
  assignServiceCenterToBreakdown: BreakdownServiceAssignment;
  changeBreakdownServiceStatus: BreakdownServiceStatus;
  changeBreakdownStatus: BreakdownStatus;
  changeCouponStatus: CouponOrCoupons;
  changeModuleStatus: ApplicationModuleUnion;
  changeOfferStatus: OfferUnion;
  changePackageStatus: PackageUnion;
  changePassword: Scalars['Boolean']['output'];
  changePlanStatus: PlanOrPlans;
  changeRoleStatus: RoleUnion;
  changeSubscriptionStatus: SubscriptionsUnion;
  changeUserStatus: UserUnion;
  changeVehicleExpenseStatus: VehicleExpenseStatus;
  changeWarehouseStatus: Warehouse;
  createBreakdown: Breakdown;
  createContact: Contact;
  createCoupon: Coupon;
  createDynamicPage: About;
  createFollowUp: Array<FollowUp>;
  createFollowUpReply: FollowUp;
  createMeeting: Meeting;
  createMeetingTask: MeetingTask;
  createMeetingType: MeetingType;
  createMeetingVenue: MeetingVenue;
  createMilestone: Milestone;
  createModule: ApplicationModule;
  createMultipleOrder: Scalars['JSONObject']['output'];
  createNotePad: NotePad;
  createNotes: Array<Notes>;
  createOffer: Offer;
  createOrganization: Organization;
  createPackage: Package;
  createPermission: Permissions;
  createPlan: Plan;
  createProject: Project;
  createRole: Role;
  createServiceCenter: ServiceCenter;
  createSubTasks: Array<MeetingTask>;
  createSubscription: Subscriptions;
  createSubscriptionWithPlans: Subscriptions;
  createUser: User;
  createVehicle: Vehicle;
  createVehicleExpense: VehicleExpense;
  createWarehouse: Warehouse;
  deleteBreakdown: Scalars['Boolean']['output'];
  deleteContact: Scalars['Boolean']['output'];
  deleteCoupon: Scalars['Boolean']['output'];
  deleteDynamicPage: Scalars['Boolean']['output'];
  deleteFollowUp: Scalars['Boolean']['output'];
  deleteMeting: Scalars['Boolean']['output'];
  deleteMetingTask: Scalars['Boolean']['output'];
  deleteMetingType: Scalars['Boolean']['output'];
  deleteMetingVenue: Scalars['Boolean']['output'];
  deleteMilestone: Scalars['Boolean']['output'];
  deleteModule: Scalars['Boolean']['output'];
  deleteNotePad: Scalars['Boolean']['output'];
  deleteNotes: Scalars['Boolean']['output'];
  deleteOffer: Scalars['Boolean']['output'];
  deleteOrganization: Scalars['Boolean']['output'];
  deletePackage: Scalars['Boolean']['output'];
  deletePermission: Scalars['Boolean']['output'];
  deletePlan: Scalars['Boolean']['output'];
  deleteProject: Scalars['Boolean']['output'];
  deleteRole: Scalars['Boolean']['output'];
  deleteServiceCenter: Scalars['Boolean']['output'];
  deleteSubscription: Scalars['Boolean']['output'];
  deleteUser: Scalars['Boolean']['output'];
  deleteVehicle: Scalars['Boolean']['output'];
  deleteVehicleExpense: Scalars['Boolean']['output'];
  deleteWarehouse: Scalars['Boolean']['output'];
  enableMeetingStatus: MeetingOrMeetings;
  enableMeetingTaskStatus: MeetingTaskOrMeetingTasks;
  enableNotePad: NotePadOrNotePads;
  enableOrganizationStatus: OrganizationUnion;
  enableProjectStatus: ProjectUnion;
  enableServiceCenterStatus: ServiceCenter;
  enableVehicleStatus: Vehicle;
  forgotPassword: Scalars['Boolean']['output'];
  hardDeleteBreakdown: Scalars['Boolean']['output'];
  hardDeleteCoupon: Scalars['Boolean']['output'];
  hardDeleteFollowUp: Scalars['Boolean']['output'];
  hardDeleteMeeting: Scalars['Boolean']['output'];
  hardDeleteMeetingTask: Scalars['Boolean']['output'];
  hardDeleteMeetingType: Scalars['Boolean']['output'];
  hardDeleteMeetingVenue: Scalars['Boolean']['output'];
  hardDeleteMilestone: Scalars['Boolean']['output'];
  hardDeleteModule: Scalars['Boolean']['output'];
  hardDeleteNotePad: Scalars['Boolean']['output'];
  hardDeleteNotes: Scalars['Boolean']['output'];
  hardDeleteOffer: Scalars['Boolean']['output'];
  hardDeleteOrganization: Scalars['Boolean']['output'];
  hardDeletePackage: Scalars['Boolean']['output'];
  hardDeletePlan: Scalars['Boolean']['output'];
  hardDeleteProject: Scalars['Boolean']['output'];
  hardDeleteRole: Scalars['Boolean']['output'];
  hardDeleteServiceCenter: Scalars['Boolean']['output'];
  hardDeleteSubscription: Scalars['Boolean']['output'];
  hardDeleteUser: Scalars['Boolean']['output'];
  hardDeleteVehicle: Scalars['Boolean']['output'];
  hardDeleteVehicleExpense: Scalars['Boolean']['output'];
  hardDeleteWarehouse: Scalars['Boolean']['output'];
  login: LoginRes;
  logout: Scalars['Boolean']['output'];
  markAllNotificationsMeeting: Scalars['Boolean']['output'];
  markAllVehicleNotificationsAsRead: MarkAllAsReadResponse;
  markNotificationAsReadMeeting: Scalars['Boolean']['output'];
  markVehicleNotificationAsRead: Notifications;
  register: LoginRes;
  requestOtp: OtpRes;
  resetPassword: Scalars['Boolean']['output'];
  restoreCoupon: Scalars['Boolean']['output'];
  restoreFollowUp: Scalars['Boolean']['output'];
  restoreMeeting: Scalars['Boolean']['output'];
  restoreMeetingTask: Scalars['Boolean']['output'];
  restoreMeetingType: Scalars['Boolean']['output'];
  restoreMeetingVenue: Scalars['Boolean']['output'];
  restoreMilestone: Scalars['Boolean']['output'];
  restoreModule: Scalars['Boolean']['output'];
  restoreNotePad: Scalars['Boolean']['output'];
  restoreNotes: Scalars['Boolean']['output'];
  restoreOffer: Scalars['Boolean']['output'];
  restoreOrganization: Scalars['Boolean']['output'];
  restorePackage: Scalars['Boolean']['output'];
  restorePlan: Scalars['Boolean']['output'];
  restoreProject: Scalars['Boolean']['output'];
  restoreRole: Scalars['Boolean']['output'];
  restoreServiceCenter: Scalars['Boolean']['output'];
  restoreSubscription: Scalars['Boolean']['output'];
  restoreUser: Scalars['Boolean']['output'];
  restoreVehicle: Scalars['Boolean']['output'];
  restoreVehicleBreakdown: Scalars['Boolean']['output'];
  restoreVehicleExpense: Scalars['Boolean']['output'];
  restoreWarehouse: Scalars['Boolean']['output'];
  sendMultiplePushNotification: NotificationResponse;
  sendPushNotification: NotificationResponse;
  sendRegistrationOtp: OtpRes;
  sendTopicNotification: NotificationResponse;
  updateBreakdown: Breakdown;
  updateCoupon: Coupon;
  updateDynamicPage: About;
  updateFollowUp: FollowUp;
  updateMeeting: Meeting;
  updateMeetingTask: MeetingTask;
  updateMeetingType: MeetingType;
  updateMeetingVenue: MeetingVenue;
  updateMilestone: Milestone;
  updateModule: ApplicationModule;
  updateNotePad: NotePad;
  updateNotes: Notes;
  updateOffer: Offer;
  updateOrganization: Organization;
  updatePackage: Package;
  updatePermission: Permissions;
  updatePlan: Plan;
  updateProfile: User;
  updateProject: Project;
  updateRole: Role;
  updateServiceCenter: ServiceCenter;
  updateSubscription: Subscriptions;
  updateTaskStatusByAdmin: MeetingTask;
  updateUser: User;
  updateVehicle: Vehicle;
  updateVehicleExpense: VehicleExpense;
  updateWarehouse: Warehouse;
  verifyPayment: Array<Subscriptions>;
};


export type MutationAddMediaToBreakdownArgs = {
  data: BreakdownMediaDto;
};


export type MutationApplyCouponToPlanArgs = {
  couponCode: Scalars['String']['input'];
  planId: Scalars['Int']['input'];
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


export type MutationAssignServiceCenterToBreakdownArgs = {
  createServiceCenterInput: CreateAssignServiceCenterDto;
};


export type MutationChangeBreakdownServiceStatusArgs = {
  data: BreakdownServiceStatusDto;
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


export type MutationChangeRoleStatusArgs = {
  data: RoleStatusDto;
};


export type MutationChangeSubscriptionStatusArgs = {
  updateSubscriptionStatusInput: SubscriptionStatusDto;
};


export type MutationChangeUserStatusArgs = {
  data: UserStatusDto;
};


export type MutationChangeVehicleExpenseStatusArgs = {
  data: VehicleExpenseStatusDto;
};


export type MutationChangeWarehouseStatusArgs = {
  data: WarehouseStatusDto;
};


export type MutationCreateBreakdownArgs = {
  data: CreateBreakdownDto;
};


export type MutationCreateContactArgs = {
  data: CreateContactDto;
};


export type MutationCreateCouponArgs = {
  createCouponInput: CreateCouponDto;
};


export type MutationCreateDynamicPageArgs = {
  data: CreateAboutDto;
};


export type MutationCreateFollowUpArgs = {
  followUpData: CreateFollowUpDto;
};


export type MutationCreateFollowUpReplyArgs = {
  input: CreateFollowUpDto;
};


export type MutationCreateMeetingArgs = {
  data: CreateMeetingDto;
};


export type MutationCreateMeetingTaskArgs = {
  input: CreateMeetingTaskDto;
};


export type MutationCreateMeetingTypeArgs = {
  data: CreateMeetingTypeDto;
};


export type MutationCreateMeetingVenueArgs = {
  data: CreateMeetingVenueDto;
};


export type MutationCreateMilestoneArgs = {
  input: MilestoneDto;
};


export type MutationCreateModuleArgs = {
  createModuleInput: CreateModuleDto;
};


export type MutationCreateMultipleOrderArgs = {
  input: CreateMultipleOrderInput;
};


export type MutationCreateNotePadArgs = {
  notesData: CreateNotePadDto;
};


export type MutationCreateNotesArgs = {
  notesData: Array<CreateNotesDto>;
};


export type MutationCreateOfferArgs = {
  createOfferInput: CreateOfferDto;
};


export type MutationCreateOrganizationArgs = {
  createOrganizationInput: CreateOrganizationDto;
  registerData: RegisterDto;
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


export type MutationCreateServiceCenterArgs = {
  createServiceCenterInput: CreateServiceCenterDto;
};


export type MutationCreateSubTasksArgs = {
  input: Array<CreateMeetingTaskDto>;
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


export type MutationDeleteContactArgs = {
  ids: Array<Scalars['Int']['input']>;
};


export type MutationDeleteCouponArgs = {
  ids: Array<Scalars['Int']['input']>;
};


export type MutationDeleteDynamicPageArgs = {
  ids: Array<Scalars['Int']['input']>;
};


export type MutationDeleteFollowUpArgs = {
  ids: Array<Scalars['Int']['input']>;
};


export type MutationDeleteMetingArgs = {
  ids: Array<Scalars['Int']['input']>;
};


export type MutationDeleteMetingTaskArgs = {
  ids: Array<Scalars['Int']['input']>;
};


export type MutationDeleteMetingTypeArgs = {
  ids: Array<Scalars['Int']['input']>;
};


export type MutationDeleteMetingVenueArgs = {
  ids: Array<Scalars['Int']['input']>;
};


export type MutationDeleteMilestoneArgs = {
  ids: Array<Scalars['Int']['input']>;
};


export type MutationDeleteModuleArgs = {
  ids: Array<Scalars['Int']['input']>;
};


export type MutationDeleteNotePadArgs = {
  ids: Array<Scalars['Int']['input']>;
};


export type MutationDeleteNotesArgs = {
  ids: Array<Scalars['Int']['input']>;
};


export type MutationDeleteOfferArgs = {
  ids: Array<Scalars['Int']['input']>;
};


export type MutationDeleteOrganizationArgs = {
  ids: Array<Scalars['Int']['input']>;
};


export type MutationDeletePackageArgs = {
  ids: Array<Scalars['Int']['input']>;
};


export type MutationDeletePermissionArgs = {
  id: Scalars['Float']['input'];
};


export type MutationDeletePlanArgs = {
  ids: Array<Scalars['Int']['input']>;
};


export type MutationDeleteProjectArgs = {
  ids: Array<Scalars['Int']['input']>;
};


export type MutationDeleteRoleArgs = {
  ids: Array<Scalars['Int']['input']>;
};


export type MutationDeleteServiceCenterArgs = {
  id: Scalars['Int']['input'];
};


export type MutationDeleteSubscriptionArgs = {
  ids: Array<Scalars['Int']['input']>;
};


export type MutationDeleteUserArgs = {
  ids: Array<Scalars['Int']['input']>;
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
  updateMeetingStatusInput: MeetingStatusDto;
};


export type MutationEnableMeetingTaskStatusArgs = {
  updateMeetingTaskStatusInput: MeetingTaskStatusDto;
};


export type MutationEnableNotePadArgs = {
  updateMeetingStatusInput: NotePadStatusDto;
};


export type MutationEnableOrganizationStatusArgs = {
  data: OrganizationStatusDto;
};


export type MutationEnableProjectStatusArgs = {
  data: ProjectStatusDto;
};


export type MutationEnableServiceCenterStatusArgs = {
  data: ServiceCenterStatusDto;
};


export type MutationEnableVehicleStatusArgs = {
  data: VehicleStatusDto;
};


export type MutationForgotPasswordArgs = {
  email: Scalars['String']['input'];
};


export type MutationHardDeleteBreakdownArgs = {
  ids: Scalars['Int']['input'];
};


export type MutationHardDeleteCouponArgs = {
  ids: Array<Scalars['Int']['input']>;
};


export type MutationHardDeleteFollowUpArgs = {
  ids: Array<Scalars['Int']['input']>;
};


export type MutationHardDeleteMeetingArgs = {
  ids: Array<Scalars['Int']['input']>;
};


export type MutationHardDeleteMeetingTaskArgs = {
  ids: Array<Scalars['Int']['input']>;
};


export type MutationHardDeleteMeetingTypeArgs = {
  ids: Array<Scalars['Int']['input']>;
};


export type MutationHardDeleteMeetingVenueArgs = {
  ids: Array<Scalars['Int']['input']>;
};


export type MutationHardDeleteMilestoneArgs = {
  ids: Array<Scalars['Int']['input']>;
};


export type MutationHardDeleteModuleArgs = {
  ids: Array<Scalars['Int']['input']>;
};


export type MutationHardDeleteNotePadArgs = {
  ids: Array<Scalars['Int']['input']>;
};


export type MutationHardDeleteNotesArgs = {
  ids: Array<Scalars['Int']['input']>;
};


export type MutationHardDeleteOfferArgs = {
  ids: Array<Scalars['Int']['input']>;
};


export type MutationHardDeleteOrganizationArgs = {
  ids: Array<Scalars['Int']['input']>;
};


export type MutationHardDeletePackageArgs = {
  ids: Array<Scalars['Int']['input']>;
};


export type MutationHardDeletePlanArgs = {
  ids: Array<Scalars['Int']['input']>;
};


export type MutationHardDeleteProjectArgs = {
  ids: Array<Scalars['Int']['input']>;
};


export type MutationHardDeleteRoleArgs = {
  ids: Array<Scalars['Int']['input']>;
};


export type MutationHardDeleteServiceCenterArgs = {
  ids: Array<Scalars['Int']['input']>;
};


export type MutationHardDeleteSubscriptionArgs = {
  ids: Array<Scalars['Int']['input']>;
};


export type MutationHardDeleteUserArgs = {
  ids: Array<Scalars['Int']['input']>;
};


export type MutationHardDeleteVehicleArgs = {
  ids: Array<Scalars['Int']['input']>;
};


export type MutationHardDeleteVehicleExpenseArgs = {
  ids: Scalars['Int']['input'];
};


export type MutationHardDeleteWarehouseArgs = {
  id: Scalars['Float']['input'];
};


export type MutationLoginArgs = {
  loginData: ValidateDto;
};


export type MutationMarkNotificationAsReadMeetingArgs = {
  id: Scalars['Int']['input'];
};


export type MutationMarkVehicleNotificationAsReadArgs = {
  input: MarkAsReadInput;
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
  ids: Array<Scalars['Int']['input']>;
};


export type MutationRestoreFollowUpArgs = {
  ids: Array<Scalars['Int']['input']>;
};


export type MutationRestoreMeetingArgs = {
  ids: Array<Scalars['Int']['input']>;
};


export type MutationRestoreMeetingTaskArgs = {
  ids: Array<Scalars['Int']['input']>;
};


export type MutationRestoreMeetingTypeArgs = {
  ids: Array<Scalars['Int']['input']>;
};


export type MutationRestoreMeetingVenueArgs = {
  ids: Array<Scalars['Int']['input']>;
};


export type MutationRestoreMilestoneArgs = {
  ids: Array<Scalars['Int']['input']>;
};


export type MutationRestoreModuleArgs = {
  ids: Array<Scalars['Int']['input']>;
};


export type MutationRestoreNotePadArgs = {
  ids: Array<Scalars['Int']['input']>;
};


export type MutationRestoreNotesArgs = {
  ids: Array<Scalars['Int']['input']>;
};


export type MutationRestoreOfferArgs = {
  ids: Array<Scalars['Int']['input']>;
};


export type MutationRestoreOrganizationArgs = {
  ids: Array<Scalars['Int']['input']>;
};


export type MutationRestorePackageArgs = {
  ids: Array<Scalars['Int']['input']>;
};


export type MutationRestorePlanArgs = {
  ids: Array<Scalars['Int']['input']>;
};


export type MutationRestoreProjectArgs = {
  ids: Array<Scalars['Int']['input']>;
};


export type MutationRestoreRoleArgs = {
  ids: Array<Scalars['Int']['input']>;
};


export type MutationRestoreServiceCenterArgs = {
  id: Scalars['Float']['input'];
};


export type MutationRestoreSubscriptionArgs = {
  ids: Array<Scalars['Int']['input']>;
};


export type MutationRestoreUserArgs = {
  ids: Array<Scalars['Int']['input']>;
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


export type MutationSendMultiplePushNotificationArgs = {
  data: MultipleDeviceNotificationDto;
};


export type MutationSendPushNotificationArgs = {
  data: NotificationDto;
};


export type MutationSendRegistrationOtpArgs = {
  email: Scalars['String']['input'];
};


export type MutationSendTopicNotificationArgs = {
  data: TopicNotificationDto;
};


export type MutationUpdateBreakdownArgs = {
  data: UpdateBreakdownDto;
};


export type MutationUpdateCouponArgs = {
  updateCouponInput: UpdateCouponDto;
};


export type MutationUpdateDynamicPageArgs = {
  data: UpdateAboutDto;
};


export type MutationUpdateFollowUpArgs = {
  updateFollowUpInput: UpdateFollowUpDto;
};


export type MutationUpdateMeetingArgs = {
  updateMeetingInput: UpdateMeetingDto;
};


export type MutationUpdateMeetingTaskArgs = {
  updateMeetingTaskInput: UpdateMeetingTaskDto;
};


export type MutationUpdateMeetingTypeArgs = {
  updateMeetingTypeInput: UpdateMeetingTypeDto;
};


export type MutationUpdateMeetingVenueArgs = {
  updateMeetingVenueInput: UpdateMeetingVenueDto;
};


export type MutationUpdateMilestoneArgs = {
  updateMilestoneInput: UpdateMilestoneDto;
};


export type MutationUpdateModuleArgs = {
  updateModuleInput: UpdateModuleDto;
};


export type MutationUpdateNotePadArgs = {
  updateNotesInput: UpdateNotePadDto;
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


export type MutationUpdateServiceCenterArgs = {
  updateServiceCenterInput: UpdateServiceCenterDto;
};


export type MutationUpdateSubscriptionArgs = {
  updateSubscriptionInput: UpdateSubscriptionDto;
};


export type MutationUpdateTaskStatusByAdminArgs = {
  input: MeetingTaskStatusDto;
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


export type MutationVerifyPaymentArgs = {
  input: VerifyPaymentInput;
};

export type NotePad = {
  __typename?: 'NotePad';
  UserId: Scalars['ID']['output'];
  createdAt: Scalars['DateTime']['output'];
  createdBy: User;
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['ID']['output'];
  notesField?: Maybe<Scalars['String']['output']>;
  organization: Organization;
  status: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type NotePadArray = {
  __typename?: 'NotePadArray';
  data: Array<NotePad>;
};

export type NotePadOrNotePads = NotePad | NotePadArray;

/** NotePad Status */
export enum NotePadStatus {
  Completed = 'completed',
  Pending = 'pending'
}

export type NotePadStatusDto = {
  ids: Array<Scalars['Float']['input']>;
  status: NotePadStatus;
};

export type Notes = {
  __typename?: 'Notes';
  createdAt: Scalars['DateTime']['output'];
  createdBy: User;
  createdByUserId: Scalars['ID']['output'];
  decision?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  meeting?: Maybe<Meeting>;
  meetingId?: Maybe<Scalars['Float']['output']>;
  notes?: Maybe<Scalars['String']['output']>;
  organization: Organization;
  task?: Maybe<Array<MeetingTask>>;
  uploadDoc?: Maybe<Scalars['String']['output']>;
};

export type NotificationDto = {
  body: Scalars['String']['input'];
  icon: Scalars['String']['input'];
  title: Scalars['String']['input'];
  token: Scalars['String']['input'];
};

export type NotificationResponse = {
  __typename?: 'NotificationResponse';
  message?: Maybe<Scalars['String']['output']>;
  success: Scalars['Boolean']['output'];
};

export type Notifications = {
  __typename?: 'Notifications';
  actionUrl?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  createdBy?: Maybe<User>;
  createdById?: Maybe<Scalars['Float']['output']>;
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  entityId?: Maybe<Scalars['Float']['output']>;
  id: Scalars['ID']['output'];
  isRead: Scalars['Boolean']['output'];
  message: Scalars['String']['output'];
  module: Scalars['String']['output'];
  organizationBy: Organization;
  organizationId: Scalars['Int']['output'];
  readAt?: Maybe<Scalars['DateTime']['output']>;
  title: Scalars['String']['output'];
  userBy?: Maybe<User>;
  userId?: Maybe<Scalars['Float']['output']>;
};

export type Offer = {
  __typename?: 'Offer';
  description?: Maybe<Scalars['String']['output']>;
  discountPercent?: Maybe<Scalars['Float']['output']>;
  discountValue?: Maybe<Scalars['Float']['output']>;
  endDate: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  offerType?: Maybe<Scalars['String']['output']>;
  startDate: Scalars['DateTime']['output'];
  status: Scalars['String']['output'];
  title: Scalars['String']['output'];
  usageLimit: Scalars['Float']['output'];
};

export type OfferArray = {
  __typename?: 'OfferArray';
  data: Array<Offer>;
};

/** OFFER STATUS */
export enum OfferStatus {
  Active = 'active',
  Expired = 'expired',
  Inactive = 'inactive'
}

export type OfferStatusDto = {
  ids: Array<Scalars['Float']['input']>;
  status: OfferStatus;
};

export type OfferUnion = Offer | OfferArray;

export type Organization = {
  __typename?: 'Organization';
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  status: Scalars['String']['output'];
};

export type OrganizationArray = {
  __typename?: 'OrganizationArray';
  data: Array<Organization>;
};

export type OrganizationStatusDto = {
  ids: Array<Scalars['Float']['input']>;
  status: CustomStatus;
};

export type OrganizationUnion = Organization | OrganizationArray;

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
  offerDescription?: Maybe<Scalars['String']['output']>;
  offerExpiryDate?: Maybe<Scalars['DateTime']['output']>;
  offerType?: Maybe<Scalars['String']['output']>;
  price: Scalars['Float']['output'];
  status: Scalars['String']['output'];
};

export type PackageArray = {
  __typename?: 'PackageArray';
  data: Array<Package>;
};

/** Package Status */
export enum PackageStatus {
  Active = 'active',
  Expired = 'expired',
  Inactive = 'inactive'
}

export type PackageStatusDto = {
  ids: Array<Scalars['Float']['input']>;
  status: PackageStatus;
};

export type PackageUnion = Package | PackageArray;

export type PaginatedAbout = {
  __typename?: 'PaginatedAbout';
  data: Array<About>;
  meta: Meta;
};

export type PaginatedActivity = {
  __typename?: 'PaginatedActivity';
  data: Array<Activity>;
  meta: Meta;
};

export type PaginatedApplicationModules = {
  __typename?: 'PaginatedApplicationModules';
  data: Array<ApplicationModule>;
  meta: Meta;
};

export type PaginatedBreakdownServiceAssignment = {
  __typename?: 'PaginatedBreakdownServiceAssignment';
  data: Array<BreakdownServiceAssignment>;
  meta: Meta;
};

export type PaginatedBreakdowns = {
  __typename?: 'PaginatedBreakdowns';
  data: Array<Breakdown>;
  meta: Meta;
};

export type PaginatedContact = {
  __typename?: 'PaginatedContact';
  data: Array<Contact>;
  meta: Meta;
};

export type PaginatedCoupons = {
  __typename?: 'PaginatedCoupons';
  data: Array<Coupon>;
  meta: Meta;
};

export type PaginatedFollowUp = {
  __typename?: 'PaginatedFollowUp';
  data: Array<FollowUp>;
  meta: Meta;
};

export type PaginatedLogs = {
  __typename?: 'PaginatedLogs';
  data: Array<Logs>;
  meta: Meta;
};

export type PaginatedMeeting = {
  __typename?: 'PaginatedMeeting';
  data: Array<Meeting>;
  meta: Meta;
};

export type PaginatedMeetingNotification = {
  __typename?: 'PaginatedMeetingNotification';
  data: Array<MeetingNotification>;
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

export type PaginatedMilestone = {
  __typename?: 'PaginatedMilestone';
  data: Array<Milestone>;
  meta: Meta;
};

export type PaginatedNotePad = {
  __typename?: 'PaginatedNotePad';
  data: Array<NotePad>;
  meta: Meta;
};

export type PaginatedNotes = {
  __typename?: 'PaginatedNotes';
  data: Array<Notes>;
  meta: Meta;
};

export type PaginatedNotifications = {
  __typename?: 'PaginatedNotifications';
  data: Array<Notifications>;
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

export type PaginatedServiceCenter = {
  __typename?: 'PaginatedServiceCenter';
  data: Array<ServiceCenter>;
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

export type PeriodComparison = {
  __typename?: 'PeriodComparison';
  amountChange: Scalars['Float']['output'];
  percentageChange: Scalars['Float']['output'];
  previousPeriod: PreviousPeriod;
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
  coupon?: Maybe<Coupon>;
  couponCode?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  discountedPrice?: Maybe<Scalars['Float']['output']>;
  duration: Scalars['Float']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  package?: Maybe<Package>;
  price: Scalars['Float']['output'];
  status: Scalars['String']['output'];
};

export type PlanArray = {
  __typename?: 'PlanArray';
  data: Array<Plan>;
};

export type PlanOrPlans = Plan | PlanArray;

/** Plan Status */
export enum PlanStatus {
  Active = 'active',
  Expired = 'expired',
  Inactive = 'inactive'
}

export type PlanStatusDto = {
  ids: Array<Scalars['Float']['input']>;
  status: PlanStatus;
};

export type Post = {
  __typename?: 'Post';
  authorId: Scalars['Int']['output'];
  id: Scalars['ID']['output'];
  title: Scalars['String']['output'];
  user: User;
};

export type PreviousPeriod = {
  __typename?: 'PreviousPeriod';
  expenseCount: Scalars['Int']['output'];
  totalAmount: Scalars['Float']['output'];
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

export type ProjectArray = {
  __typename?: 'ProjectArray';
  data: Array<Project>;
};

export type ProjectStatusDto = {
  ids: Array<Scalars['Float']['input']>;
  status: CustomStatus;
};

export type ProjectUnion = Project | ProjectArray;

export type Query = {
  __typename?: 'Query';
  MeetingCalender: Array<Meeting>;
  MeetingHierarchyTree: Array<Meeting>;
  MeetingTaskCalender: Array<MeetingTask>;
  allPermissions: DynamicPermissionsDto;
  breakdownDropdown: PaginatedBreakdowns;
  couponsDropdown: PaginatedCoupons;
  dashboardCount: DashboardCount;
  dashboardVehicleCount: VehicleDashboardCount;
  dropDownMeeting: PaginatedMeeting;
  dropDownMeetingTask: PaginatedMeetingTask;
  dropDownMeetingType: PaginatedMeetingType;
  dropDownMeetingVenue: PaginatedMeetingVenue;
  dropDownNotes: PaginatedNotes;
  dropdownOffers: PaginatedOffers;
  dropdownRoles: PaginatedRoles;
  exportMeetingFile: Scalars['String']['output'];
  exportMeetingNotesFile: Scalars['String']['output'];
  exportMeetingTaskFile: Scalars['String']['output'];
  exportMeetingTypeFile: Scalars['String']['output'];
  exportMeetingVenueFile: Scalars['String']['output'];
  filteredMeetingTasks: PaginatedMeetingTask;
  findBreakdownById: Breakdown;
  findCouponById: Coupon;
  findModuleById: ApplicationModule;
  findOfferById: Offer;
  findOrganizationById: Organization;
  findPackageById: Package;
  findPermissionById: Permissions;
  findPermissionsByUser: Array<Scalars['String']['output']>;
  findPlanById: Plan;
  findRoleById: Role;
  findServiceCenterById: ServiceCenter;
  findSubscriptionById: Subscriptions;
  findUserById: User;
  findVehicleById: Vehicle;
  findVehicleExpenseById: VehicleExpense;
  findWarehouseById: Warehouse;
  getActivityIdMeeting: Activity;
  getAllDynamicPage: PaginatedAbout;
  getAllMeetingTypes: Array<MeetingType>;
  getAllNotePad: Array<NotePad>;
  getBreakdownExportData: Scalars['String']['output'];
  getBreakdownServiceAssignmentById: BreakdownServiceAssignment;
  getBreakdownServiceExportData: Scalars['String']['output'];
  getBreakdownServiceStatusCounts: Array<Scalars['JSON']['output']>;
  getBreakdownServiceStatuses: Array<BreakdownServiceStatus>;
  getBreakdownStatusCounts: Array<Scalars['JSON']['output']>;
  getBreakdownStatuses: Array<BreakdownStatus>;
  getBreakdownTypeSuggestions: Array<Scalars['JSON']['output']>;
  getContactById: Contact;
  getDynamicPageById: About;
  getFollowUpById: FollowUp;
  getMeetingDashboard: Dashboard;
  getMeetingId: Meeting;
  getMeetingIdTask: MeetingTask;
  getMeetingType: MeetingType;
  getMeetingVenue: MeetingVenue;
  getNotePadById: NotePad;
  getNotesId: Notes;
  getPaginatedMeetingTaskByMeetingId: PaginatedMeetingTask;
  getPaginatedNotesByMeetingId: PaginatedNotes;
  getServiceCenterExportData: Scalars['String']['output'];
  getServiceCenterStatusCounts: Array<Scalars['JSON']['output']>;
  getTodaysMeetings: PaginatedMeeting;
  getUpcomingMeetingTask: PaginatedMeetingTask;
  getUpcomingMeetings: PaginatedMeeting;
  getUsersWithPermission: Array<User>;
  getVehicleDashboardAnalytics: DashboardAnalyticsResponse;
  getVehicleExpenseByType: ExpenseByTypeResponse;
  getVehicleExpenseExportData: Scalars['String']['output'];
  getVehicleExpenseStatusCounts: Array<Scalars['JSON']['output']>;
  getVehicleExpenseStatuses: Array<VehicleExpenseStatus>;
  getVehicleExpenseSummary: ExpenseSummaryResponse;
  getVehicleExpenseTypeSuggestions: Array<Scalars['JSON']['output']>;
  getVehicleExportData: Scalars['String']['output'];
  getVehicleMonthlyTrends: MonthlyTrendResponse;
  getVehicleStatusCounts: Array<Scalars['JSON']['output']>;
  getVehicleTopExpenses: TopExpensesResponse;
  listTrashedChildMeting: PaginatedMeeting;
  listTrashedFollowUp: PaginatedFollowUp;
  listTrashedMeeting: PaginatedMeeting;
  listTrashedMeetingTask: PaginatedMeetingTask;
  listTrashedMeetingType: PaginatedMeetingType;
  listTrashedMeetingVenue: PaginatedMeetingVenue;
  listTrashedMetingSubTasks: PaginatedMeetingTask;
  listTrashedNotePad: PaginatedNotePad;
  listTrashedNotes: PaginatedNotes;
  listTrashedOrganizations: PaginatedOrganizations;
  listTrashedProjects: PaginatedProjects;
  listTrashedRoles: PaginatedRoles;
  meetingHierarchyByParent: Array<Meeting>;
  meetingNotificationIsRead: Array<MeetingNotification>;
  meetingTaskDateRangeGraph: Array<MeetingDateCount>;
  meetingsByMonthYear: Scalars['JSONObject']['output'];
  meetingsDateRangeGraph: Array<MeetingDateCount>;
  packagesDropdown: PaginatedPackages;
  paginatedActivityLogMeeting: PaginatedActivity;
  paginatedBreakdownAssignmentServiceCenters: PaginatedBreakdownServiceAssignment;
  paginatedBreakdowns: PaginatedBreakdowns;
  paginatedContact: PaginatedContact;
  paginatedCoupons: PaginatedCoupons;
  paginatedFollowUp: PaginatedFollowUp;
  paginatedLogs: PaginatedLogs;
  paginatedMeeting: PaginatedMeeting;
  paginatedMeetingParentId: PaginatedMeeting;
  paginatedMeetingSubTask: PaginatedMeetingTask;
  paginatedMeetingTask: PaginatedMeetingTask;
  paginatedMeetingType: PaginatedMeetingType;
  paginatedMeetingVenue: PaginatedMeetingVenue;
  paginatedMeetingsForUserId: PaginatedMeeting;
  paginatedMeetingsNotification: PaginatedMeetingNotification;
  paginatedMilestone: PaginatedMilestone;
  paginatedModules: PaginatedApplicationModules;
  paginatedNotePad: PaginatedNotePad;
  paginatedNotes: PaginatedNotes;
  paginatedOffers: PaginatedOffers;
  paginatedOrganization: PaginatedOrganizations;
  paginatedPackages: PaginatedPackages;
  paginatedPermissions: PaginatedPermissions;
  paginatedPlans: PaginatedPlans;
  paginatedPlansForList: PaginatedPlans;
  paginatedProjects: PaginatedProjects;
  paginatedRoles: PaginatedRoles;
  paginatedServiceCenters: PaginatedServiceCenter;
  paginatedSubscriptions: PaginatedSubscriptions;
  paginatedTrashedWarehouses: PaginatedWarehouse;
  paginatedUsers: PaginatedUsers;
  paginatedVehicleExpense: PaginatedVehicleExpense;
  paginatedVehicleNotification: PaginatedNotifications;
  paginatedVehicles: PaginatedVehicles;
  paginatedWarehouses: PaginatedWarehouse;
  paginatedWithFollowUp: PaginatedFollowUp;
  permissionGroup: PermissionGroup;
  post: Post;
  posts: Array<Post>;
  project: Project;
  serviceCenterDropdown: PaginatedServiceCenter;
  trashedCoupons: PaginatedCoupons;
  trashedModules: PaginatedApplicationModules;
  trashedOffers: PaginatedOffers;
  trashedPackages: PaginatedPackages;
  trashedPlans: PaginatedPlans;
  trashedSubscriptions: PaginatedSubscriptions;
  trashedUsers: PaginatedUsers;
  userHierarchy: Array<User>;
  vehicleUnreadNotificationByUser: Scalars['Float']['output'];
  vehiclesDropdown: PaginatedVehicles;
};


export type QueryMeetingCalenderArgs = {
  filters?: InputMaybe<MeetingFiltersDto>;
};


export type QueryMeetingHierarchyTreeArgs = {
  nameFilter?: InputMaybe<Scalars['String']['input']>;
  parentMeetingId?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryMeetingTaskCalenderArgs = {
  filters?: InputMaybe<MeetingTaskFiltersDto>;
};


export type QueryBreakdownDropdownArgs = {
  ListInputDTO: ListInputDto;
};


export type QueryCouponsDropdownArgs = {
  ListInputDTO: ListInputDto;
};


export type QueryDashboardCountArgs = {
  filters: ReportFilters;
};


export type QueryDashboardVehicleCountArgs = {
  filters: ReportFilters;
};


export type QueryDropDownMeetingArgs = {
  ListInputDTO: ListInputDto;
};


export type QueryDropDownMeetingTaskArgs = {
  ListInputDTO: ListInputDto;
};


export type QueryDropDownMeetingTypeArgs = {
  ListInputDTO: ListInputDto;
};


export type QueryDropDownMeetingVenueArgs = {
  ListInputDTO: ListInputDto;
};


export type QueryDropDownNotesArgs = {
  ListInputDTO: ListInputDto;
};


export type QueryDropdownOffersArgs = {
  ListInputDTO: ListInputDto;
};


export type QueryDropdownRolesArgs = {
  ListInputDTO: ListInputDto;
};


export type QueryExportMeetingFileArgs = {
  filter?: InputMaybe<FilterMeeting>;
};


export type QueryExportMeetingNotesFileArgs = {
  filter?: InputMaybe<FilterNotesData>;
};


export type QueryExportMeetingTaskFileArgs = {
  filter?: InputMaybe<FilterMeetingTask>;
};


export type QueryExportMeetingTypeFileArgs = {
  filter?: InputMaybe<FilterMeetingType>;
};


export type QueryExportMeetingVenueFileArgs = {
  filter?: InputMaybe<FilterMeetingVenue>;
};


export type QueryFilteredMeetingTasksArgs = {
  assigneeIds?: InputMaybe<Array<Scalars['Int']['input']>>;
  query: ListInputDto;
};


export type QueryFindBreakdownByIdArgs = {
  id: Scalars['Int']['input'];
};


export type QueryFindCouponByIdArgs = {
  id: Scalars['Int']['input'];
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


export type QueryFindServiceCenterByIdArgs = {
  id: Scalars['Int']['input'];
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


export type QueryGetActivityIdMeetingArgs = {
  id: Scalars['Float']['input'];
};


export type QueryGetAllDynamicPageArgs = {
  ListInputDTO: ListInputDto;
};


export type QueryGetBreakdownExportDataArgs = {
  filter: BreakdownFilterType;
  sheetName: Scalars['String']['input'];
};


export type QueryGetBreakdownServiceAssignmentByIdArgs = {
  id: Scalars['Int']['input'];
};


export type QueryGetBreakdownServiceExportDataArgs = {
  filter: BreakdownServiceFilterType;
  sheetName: Scalars['String']['input'];
};


export type QueryGetBreakdownServiceStatusesArgs = {
  breakdownServiceId: Scalars['Int']['input'];
};


export type QueryGetBreakdownStatusesArgs = {
  breakdownId: Scalars['Int']['input'];
};


export type QueryGetBreakdownTypeSuggestionsArgs = {
  search?: InputMaybe<Scalars['String']['input']>;
};


export type QueryGetContactByIdArgs = {
  id: Scalars['Float']['input'];
};


export type QueryGetDynamicPageByIdArgs = {
  id: Scalars['Float']['input'];
};


export type QueryGetFollowUpByIdArgs = {
  id: Scalars['Float']['input'];
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


export type QueryGetNotePadByIdArgs = {
  id: Scalars['Float']['input'];
};


export type QueryGetNotesIdArgs = {
  id: Scalars['Float']['input'];
};


export type QueryGetPaginatedMeetingTaskByMeetingIdArgs = {
  meetingId: Scalars['Int']['input'];
  query: ListInputDto;
};


export type QueryGetPaginatedNotesByMeetingIdArgs = {
  meetingId: Scalars['Int']['input'];
  query: ListInputDto;
};


export type QueryGetServiceCenterExportDataArgs = {
  filter: ServiceCenterFilterType;
  sheetName: Scalars['String']['input'];
};


export type QueryGetTodaysMeetingsArgs = {
  ListInputDTO: ListInputDto;
};


export type QueryGetUpcomingMeetingTaskArgs = {
  ListInputDTO: ListInputDto;
};


export type QueryGetUpcomingMeetingsArgs = {
  ListInputDTO: ListInputDto;
};


export type QueryGetUsersWithPermissionArgs = {
  data: InputPermissionSlugDto;
};


export type QueryGetVehicleDashboardAnalyticsArgs = {
  filters?: InputMaybe<AnalyticsFilters>;
};


export type QueryGetVehicleExpenseByTypeArgs = {
  filters?: InputMaybe<AnalyticsFilters>;
};


export type QueryGetVehicleExpenseExportDataArgs = {
  filter: ExpenseFilterType;
  sheetName: Scalars['String']['input'];
};


export type QueryGetVehicleExpenseStatusesArgs = {
  expenseId: Scalars['Int']['input'];
};


export type QueryGetVehicleExpenseSummaryArgs = {
  filters?: InputMaybe<AnalyticsFilters>;
};


export type QueryGetVehicleExpenseTypeSuggestionsArgs = {
  search?: InputMaybe<Scalars['String']['input']>;
};


export type QueryGetVehicleExportDataArgs = {
  filter: VehicleFilterType;
  sheetName: Scalars['String']['input'];
};


export type QueryGetVehicleMonthlyTrendsArgs = {
  filters?: InputMaybe<AnalyticsFilters>;
};


export type QueryGetVehicleTopExpensesArgs = {
  filters?: InputMaybe<AnalyticsFilters>;
};


export type QueryListTrashedChildMetingArgs = {
  listInputDTO: ListInputDto;
};


export type QueryListTrashedFollowUpArgs = {
  ListInputDto: ListInputDto;
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


export type QueryListTrashedMetingSubTasksArgs = {
  listInputDTO: ListInputDto;
};


export type QueryListTrashedNotePadArgs = {
  ListInputDto: ListInputDto;
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


export type QueryListTrashedRolesArgs = {
  ListInputDTO: ListInputDto;
};


export type QueryMeetingHierarchyByParentArgs = {
  parentMeetingId?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryMeetingNotificationIsReadArgs = {
  isRead: Scalars['Boolean']['input'];
};


export type QueryMeetingTaskDateRangeGraphArgs = {
  filter?: InputMaybe<FilterMeetingDto>;
};


export type QueryMeetingsByMonthYearArgs = {
  filter: FilterMeetingMonthYearDto;
};


export type QueryMeetingsDateRangeGraphArgs = {
  filter?: InputMaybe<FilterMeetingDto>;
};


export type QueryPackagesDropdownArgs = {
  ListInputDTO: ListInputDto;
};


export type QueryPaginatedActivityLogMeetingArgs = {
  ListInputDTO: ListInputDto;
};


export type QueryPaginatedBreakdownAssignmentServiceCentersArgs = {
  ListInputDTO: ListInputDto;
  isTrash?: InputMaybe<Scalars['Boolean']['input']>;
};


export type QueryPaginatedBreakdownsArgs = {
  ListInputDTO: ListInputDto;
  isTrash?: InputMaybe<Scalars['Boolean']['input']>;
};


export type QueryPaginatedContactArgs = {
  ListInputDTO: ListInputDto;
};


export type QueryPaginatedCouponsArgs = {
  ListInputDTO: ListInputDto;
};


export type QueryPaginatedFollowUpArgs = {
  ListInputDTO: ListInputDto;
};


export type QueryPaginatedLogsArgs = {
  ListInputDTO: ListInputDto;
};


export type QueryPaginatedMeetingArgs = {
  ListInputDTO: ListInputDto;
};


export type QueryPaginatedMeetingParentIdArgs = {
  parentMeetingId: Scalars['Int']['input'];
  query: ListInputDto;
};


export type QueryPaginatedMeetingSubTaskArgs = {
  parentTaskId: Scalars['Int']['input'];
  query: ListInputDto;
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


export type QueryPaginatedMeetingsForUserIdArgs = {
  query: ListInputDto;
  userId: Scalars['Int']['input'];
};


export type QueryPaginatedMeetingsNotificationArgs = {
  ListInputDTO: ListInputDto;
};


export type QueryPaginatedMilestoneArgs = {
  ListInputDTO: ListInputDto;
};


export type QueryPaginatedModulesArgs = {
  ListInputDTO: ListInputDto;
};


export type QueryPaginatedNotePadArgs = {
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


export type QueryPaginatedPlansForListArgs = {
  ListInputDTO: ListInputDto;
};


export type QueryPaginatedProjectsArgs = {
  ListInputDTO: ListInputDto;
};


export type QueryPaginatedRolesArgs = {
  ListInputDTO: ListInputDto;
};


export type QueryPaginatedServiceCentersArgs = {
  ListInputDTO: ListInputDto;
  isTrash?: InputMaybe<Scalars['Boolean']['input']>;
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
  isTrash?: InputMaybe<Scalars['Boolean']['input']>;
};


export type QueryPaginatedVehicleNotificationArgs = {
  ListInputDTO: ListInputDto;
};


export type QueryPaginatedVehiclesArgs = {
  ListInputDTO: ListInputDto;
  isTrash?: InputMaybe<Scalars['Boolean']['input']>;
};


export type QueryPaginatedWarehousesArgs = {
  ListInputDTO: ListInputDto;
};


export type QueryPaginatedWithFollowUpArgs = {
  ListInputDTO: ListInputDto;
};


export type QueryPostArgs = {
  id: Scalars['ID']['input'];
};


export type QueryProjectArgs = {
  id: Scalars['Int']['input'];
};


export type QueryServiceCenterDropdownArgs = {
  ListInputDTO: ListInputDto;
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


export type QueryUserHierarchyArgs = {
  nameFilter?: InputMaybe<Scalars['String']['input']>;
  parentId?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryVehiclesDropdownArgs = {
  ListInputDTO: ListInputDto;
};

export type RegisterDto = {
  avatar?: InputMaybe<Scalars['String']['input']>;
  createdBy?: InputMaybe<Scalars['Float']['input']>;
  email: Scalars['String']['input'];
  emailOTP: Scalars['Float']['input'];
  mobileNo?: InputMaybe<Scalars['Float']['input']>;
  name: Scalars['String']['input'];
  organizationName: Scalars['String']['input'];
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

export type RoleArray = {
  __typename?: 'RoleArray';
  data: Array<Role>;
};

export type RoleStatusDto = {
  ids: Array<Scalars['Float']['input']>;
  status: CustomStatus;
};

export type RoleUnion = Role | RoleArray;

export type ServiceCenter = {
  __typename?: 'ServiceCenter';
  address: Scalars['String']['output'];
  contactNo?: Maybe<Scalars['Float']['output']>;
  createdAt: Scalars['DateTime']['output'];
  createdBy: User;
  createdById: Scalars['Int']['output'];
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['ID']['output'];
  latitude: Scalars['String']['output'];
  longitude: Scalars['String']['output'];
  name: Scalars['String']['output'];
  organizationBy: Organization;
  organizationId: Scalars['Int']['output'];
  status: Scalars['String']['output'];
  type: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type ServiceCenterFilterType = {
  createdById?: InputMaybe<Scalars['Float']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<ServiceCenterStatus>;
  type?: InputMaybe<Scalars['String']['input']>;
};

export enum ServiceCenterStatus {
  Active = 'active',
  Inactive = 'inactive'
}

export type ServiceCenterStatusDto = {
  id: Scalars['Float']['input'];
  status: ServiceCenterStatus;
};

export enum ServiceCenterType {
  External = 'external',
  InHouse = 'in_house'
}

/** Subscription Status */
export enum SubscriptionStatus {
  Active = 'active',
  Expired = 'expired',
  Inactive = 'inactive'
}

export type SubscriptionStatusDto = {
  ids: Array<Scalars['Float']['input']>;
  status: SubscriptionStatus;
};

export type Subscriptions = {
  __typename?: 'Subscriptions';
  coupon?: Maybe<Coupon>;
  couponCode?: Maybe<Scalars['String']['output']>;
  duration: Scalars['Float']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  paymentId?: Maybe<Scalars['String']['output']>;
  pdfUrl: Scalars['String']['output'];
  plans: Array<Plan>;
  price: Scalars['Float']['output'];
  status: Scalars['String']['output'];
};

export type SubscriptionsArray = {
  __typename?: 'SubscriptionsArray';
  data: Array<Subscriptions>;
};

export type SubscriptionsUnion = Subscriptions | SubscriptionsArray;

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

export type TopExpenseItem = {
  __typename?: 'TopExpenseItem';
  amount: Scalars['Float']['output'];
  description?: Maybe<Scalars['String']['output']>;
  expenseDate: Scalars['String']['output'];
  expenseType: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  status: Scalars['String']['output'];
  vehicleNumberPlate: Scalars['String']['output'];
};

export type TopExpensesResponse = {
  __typename?: 'TopExpensesResponse';
  data: Array<TopExpenseItem>;
  totalAmount: Scalars['Float']['output'];
};

export type TopicNotificationDto = {
  body: Scalars['String']['input'];
  icon: Scalars['String']['input'];
  title: Scalars['String']['input'];
  topic: Scalars['String']['input'];
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

export type UpdateAboutDto = {
  content: Scalars['String']['input'];
  contentJson: Scalars['String']['input'];
  description: Scalars['String']['input'];
  id: Scalars['Float']['input'];
  imageUrl: Scalars['String']['input'];
  title: Scalars['String']['input'];
};

export type UpdateBreakdownDto = {
  breakdownDate: Scalars['String']['input'];
  breakdownDescription: Scalars['String']['input'];
  breakdownLocation: Scalars['String']['input'];
  breakdownType: Scalars['String']['input'];
  id: Scalars['Int']['input'];
  latitude: Scalars['String']['input'];
  longitude: Scalars['String']['input'];
  mediaUrl?: InputMaybe<Array<MediaDto>>;
  removedFileIds?: InputMaybe<Array<Scalars['String']['input']>>;
  vehicleId: Scalars['Float']['input'];
};

export type UpdateCouponDto = {
  couponCode: Scalars['String']['input'];
  description: Scalars['String']['input'];
  discountValue: Scalars['Float']['input'];
  endDate: Scalars['String']['input'];
  id: Scalars['Float']['input'];
  minOrderAmount: Scalars['Float']['input'];
  startDate: Scalars['String']['input'];
  usageLimit: Scalars['Float']['input'];
};

export type UpdateFollowUpDto = {
  body?: InputMaybe<Scalars['String']['input']>;
  followUpId?: InputMaybe<Scalars['Float']['input']>;
  id: Scalars['Float']['input'];
  subject?: InputMaybe<Scalars['String']['input']>;
  taskId?: InputMaybe<Scalars['Float']['input']>;
  userId?: InputMaybe<Scalars['Float']['input']>;
};

export type UpdateMeetingDto = {
  attendees?: InputMaybe<Scalars['JSON']['input']>;
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
  assigneeId?: InputMaybe<Scalars['Float']['input']>;
  comment?: InputMaybe<Scalars['String']['input']>;
  completePercent?: InputMaybe<Scalars['Float']['input']>;
  completedDate?: InputMaybe<Scalars['DateTime']['input']>;
  dueDate?: InputMaybe<Scalars['DateTime']['input']>;
  id: Scalars['Float']['input'];
  meetingId?: InputMaybe<Scalars['Float']['input']>;
  milestoneId?: InputMaybe<Scalars['Float']['input']>;
  notesId?: InputMaybe<Scalars['Float']['input']>;
  openedDate?: InputMaybe<Scalars['DateTime']['input']>;
  parentTaskId?: InputMaybe<Scalars['Float']['input']>;
  priority?: InputMaybe<Scalars['String']['input']>;
  projectId?: InputMaybe<Scalars['Float']['input']>;
  projectName?: InputMaybe<Scalars['String']['input']>;
  task?: InputMaybe<Scalars['String']['input']>;
  totalTaskCompleteMilestone?: InputMaybe<Scalars['Float']['input']>;
  weightType?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateMeetingTypeDto = {
  id: Scalars['Float']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateMeetingVenueDto = {
  address: Scalars['String']['input'];
  contactNumber: Scalars['Float']['input'];
  contactPerson: Scalars['String']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['Float']['input'];
  name: Scalars['String']['input'];
};

export type UpdateMilestoneDto = {
  endDate?: InputMaybe<Scalars['DateTime']['input']>;
  id: Scalars['Float']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  projectId?: InputMaybe<Scalars['Float']['input']>;
  startDate?: InputMaybe<Scalars['DateTime']['input']>;
};

export type UpdateModuleDto = {
  description: Scalars['String']['input'];
  id: Scalars['Float']['input'];
  name: Scalars['String']['input'];
};

export type UpdateNotePadDto = {
  id: Scalars['Float']['input'];
  notesField?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateNotesDto = {
  decision?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['Float']['input'];
  meetingId?: InputMaybe<Scalars['Float']['input']>;
  notes?: InputMaybe<Scalars['String']['input']>;
  uploadDoc?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateOfferDto = {
  description: Scalars['String']['input'];
  discountPercent?: InputMaybe<Scalars['Float']['input']>;
  discountValue?: InputMaybe<Scalars['Float']['input']>;
  endDate: Scalars['String']['input'];
  id: Scalars['Float']['input'];
  offerType?: InputMaybe<Scalars['String']['input']>;
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
  discountedPrice?: InputMaybe<Scalars['Float']['input']>;
  id: Scalars['Float']['input'];
  moduleIds: Array<Scalars['Int']['input']>;
  name: Scalars['String']['input'];
  offerDescription?: InputMaybe<Scalars['String']['input']>;
  offerExpiryDate?: InputMaybe<Scalars['String']['input']>;
  offerType?: InputMaybe<Scalars['String']['input']>;
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
  couponCode?: InputMaybe<Scalars['String']['input']>;
  description: Scalars['String']['input'];
  discountedPrice?: InputMaybe<Scalars['Float']['input']>;
  duration: Scalars['Float']['input'];
  id: Scalars['Float']['input'];
  name: Scalars['String']['input'];
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

export type UpdateServiceCenterDto = {
  address?: InputMaybe<Scalars['String']['input']>;
  contactNo?: InputMaybe<Scalars['Float']['input']>;
  id: Scalars['Float']['input'];
  latitude?: InputMaybe<Scalars['String']['input']>;
  longitude?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<ServiceCenterStatus>;
  type?: InputMaybe<ServiceCenterType>;
};

export type UpdateSubscriptionDto = {
  couponCode?: InputMaybe<Scalars['String']['input']>;
  discountedPrice?: InputMaybe<Scalars['Float']['input']>;
  duration: Scalars['Float']['input'];
  id: Scalars['Float']['input'];
  name: Scalars['String']['input'];
  planIds: Array<Scalars['Int']['input']>;
  price: Scalars['Float']['input'];
};

export type UpdateUserDto = {
  avatar?: InputMaybe<Scalars['String']['input']>;
  designation?: InputMaybe<Designation>;
  email?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['Int']['input'];
  mobileNo?: InputMaybe<Scalars['Float']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  parentId?: InputMaybe<Scalars['Float']['input']>;
  roleIds?: InputMaybe<Array<Scalars['Int']['input']>>;
  userType?: InputMaybe<UserType>;
};

export type UpdateVehicleDto = {
  avatar?: InputMaybe<Scalars['String']['input']>;
  chassisNumber?: InputMaybe<Scalars['String']['input']>;
  color?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['Float']['input'];
  insurance?: InputMaybe<Scalars['Boolean']['input']>;
  insuranceValidTill?: InputMaybe<Scalars['String']['input']>;
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
  designation?: Maybe<Designation>;
  email: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  meetingAttendees: Array<Meeting>;
  mobileNo?: Maybe<Scalars['Float']['output']>;
  name: Scalars['String']['output'];
  organizationId?: Maybe<Scalars['Float']['output']>;
  parent?: Maybe<User>;
  parentId?: Maybe<Scalars['Float']['output']>;
  posts: Array<Post>;
  roles?: Maybe<Array<Role>>;
  status: Scalars['String']['output'];
  subordinates?: Maybe<Array<User>>;
  updatedAt: Scalars['DateTime']['output'];
  userType: UserType;
  username?: Maybe<Scalars['String']['output']>;
};

export type UserArray = {
  __typename?: 'UserArray';
  data: Array<User>;
};

export type UserStatusDto = {
  ids: Array<Scalars['Float']['input']>;
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

export type UserUnion = User | UserArray;

export type ValidateDto = {
  email: Scalars['String']['input'];
  otp: Scalars['Float']['input'];
  password: Scalars['String']['input'];
};

export type Vehicle = {
  __typename?: 'Vehicle';
  avatar?: Maybe<Scalars['String']['output']>;
  chassisNumber: Scalars['String']['output'];
  color: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  createdBy: User;
  createdById: Scalars['Int']['output'];
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['ID']['output'];
  insurance: Scalars['Boolean']['output'];
  insuranceValidTill?: Maybe<Scalars['DateTime']['output']>;
  latitude?: Maybe<Scalars['Float']['output']>;
  longitude?: Maybe<Scalars['Float']['output']>;
  maintenanceHistory?: Maybe<Scalars['String']['output']>;
  make: Scalars['String']['output'];
  model: Scalars['String']['output'];
  numberPlate: Scalars['String']['output'];
  organizationBy: Organization;
  organizationId: Scalars['Int']['output'];
  status: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
  year: Scalars['String']['output'];
};

export type VehicleDashboardCount = {
  __typename?: 'VehicleDashboardCount';
  breakdownCount?: Maybe<Scalars['Int']['output']>;
  expenseCount?: Maybe<Scalars['Int']['output']>;
  vehicleCount?: Maybe<Scalars['Int']['output']>;
};

export type VehicleExpense = {
  __typename?: 'VehicleExpense';
  amount: Scalars['Float']['output'];
  breakDown?: Maybe<Breakdown>;
  breakDownId?: Maybe<Scalars['Float']['output']>;
  createdAt: Scalars['DateTime']['output'];
  createdBy: User;
  createdById: Scalars['Int']['output'];
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  expenseDate?: Maybe<Scalars['DateTime']['output']>;
  expenseType: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  isIndividualDeleted: Scalars['Boolean']['output'];
  organizationBy: Organization;
  organizationId: Scalars['Int']['output'];
  status: Scalars['String']['output'];
  statuses?: Maybe<Array<VehicleExpenseStatus>>;
  updatedAt: Scalars['DateTime']['output'];
  uploadDoc?: Maybe<Scalars['String']['output']>;
  vehicle: Vehicle;
  vehicleId: Scalars['Int']['output'];
};

export type VehicleExpenseStatus = {
  __typename?: 'VehicleExpenseStatus';
  approver?: Maybe<User>;
  approverId?: Maybe<Scalars['Float']['output']>;
  createdAt: Scalars['DateTime']['output'];
  createdBy?: Maybe<User>;
  createdById?: Maybe<Scalars['Float']['output']>;
  expense: VehicleExpense;
  expenseId: Scalars['Int']['output'];
  id: Scalars['ID']['output'];
  remark: Scalars['String']['output'];
  status: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type VehicleExpenseStatusDto = {
  approverId?: InputMaybe<Scalars['Float']['input']>;
  id: Scalars['Float']['input'];
  remark: Scalars['String']['input'];
  status: Vehicle_Expense_Status;
};

export type VehicleFilterType = {
  createdById?: InputMaybe<Scalars['Float']['input']>;
  endDate?: InputMaybe<Scalars['String']['input']>;
  insurance?: InputMaybe<Scalars['Boolean']['input']>;
  make?: InputMaybe<Scalars['String']['input']>;
  startDate?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<Vehicle_Status>;
};

export type VehicleStatusDto = {
  id: Scalars['Float']['input'];
  status: Vehicle_Status;
};

export type VerifyPaymentInput = {
  amount: Scalars['Float']['input'];
  couponCode?: InputMaybe<Scalars['String']['input']>;
  duration: Scalars['Float']['input'];
  planIds: Array<Scalars['Int']['input']>;
  razorpayOrderId: Scalars['String']['input'];
  razorpayPaymentId: Scalars['String']['input'];
  razorpaySignature: Scalars['String']['input'];
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

export enum Breakdown_Service_Status {
  Approved = 'approved',
  Assigned = 'assigned',
  AwaitingArrival = 'awaiting_arrival',
  AwaitingSpareParts = 'awaiting_spare_parts',
  Cancelled = 'cancelled',
  Delivered = 'delivered',
  Pending = 'pending',
  Rejected = 'rejected',
  RepairFailed = 'repair_failed',
  RepairInProgress = 'repair_in_progress',
  Repaired = 'repaired',
  ServiceScheduled = 'service_scheduled',
  VehicleReceived = 'vehicle_received'
}

export enum Breakdown_Status {
  Approved = 'approved',
  Assigned = 'assigned',
  Cancelled = 'cancelled',
  InService = 'in_service',
  Pending = 'pending',
  Rejected = 'rejected',
  RepairFailed = 'repair_failed',
  Repaired = 'repaired',
  ServiceScheduled = 'service_scheduled'
}

export enum Vehicle_Expense_Status {
  Approved = 'approved',
  Assigned = 'assigned',
  Cancelled = 'cancelled',
  Completed = 'completed',
  InProgress = 'in_progress',
  Pending = 'pending',
  Rejected = 'rejected'
}

export enum Vehicle_Status {
  Active = 'active',
  Breakdown = 'breakdown',
  Inactive = 'inactive',
  Maintenance = 'maintenance'
}

export type PaginatedRolesQueryVariables = Exact<{
  listInputDto: ListInputDto;
}>;


export type PaginatedRolesQuery = { __typename?: 'Query', paginatedRoles: { __typename?: 'PaginatedRoles', meta: { __typename?: 'Meta', totalItems: number, totalPages: number, currentPage: number, limit: number }, data: Array<{ __typename?: 'Role', id: string, name: string, description?: string | null, roleType?: string | null, permissionCount: number, status: string }> } };

export type ListTrashedRolesQueryVariables = Exact<{
  listInputDto: ListInputDto;
}>;


export type ListTrashedRolesQuery = { __typename?: 'Query', listTrashedRoles: { __typename?: 'PaginatedRoles', data: Array<{ __typename?: 'Role', description?: string | null, id: string, name: string, permissionCount: number, roleType?: string | null, status: string, organization?: { __typename?: 'Organization', description?: string | null, id: string, name: string, status: string } | null }>, meta: { __typename?: 'Meta', currentPage: number, limit: number, totalItems: number, totalPages: number } } };

export type FindRoleByIdQueryVariables = Exact<{
  findRoleByIdId: Scalars['Float']['input'];
}>;


export type FindRoleByIdQuery = { __typename?: 'Query', findRoleById: { __typename?: 'Role', id: string, name: string, description?: string | null, permissions: Array<{ __typename?: 'Permissions', id: string }> } };

export type PaginatedUsersQueryVariables = Exact<{
  listInputDto: ListInputDto;
}>;


export type PaginatedUsersQuery = { __typename?: 'Query', paginatedUsers: { __typename?: 'PaginatedUsers', meta: { __typename?: 'Meta', totalItems: number, totalPages: number, currentPage: number, limit: number }, data: Array<{ __typename?: 'User', id: string, name: string, username?: string | null, mobileNo?: number | null, email: string, status: string, avatar?: string | null, userType: UserType, designation?: Designation | null, roles?: Array<{ __typename?: 'Role', id: string, name: string }> | null }> } };

export type AllPermissionsQueryVariables = Exact<{ [key: string]: never; }>;


export type AllPermissionsQuery = { __typename?: 'Query', allPermissions: { __typename?: 'DynamicPermissionsDto', apps: Array<{ __typename?: 'AppPermissionsDto', appName: string, modules: Array<{ __typename?: 'PermissionGroupDto', name: string, permissions: Array<{ __typename?: 'PermissionDto', module: string, description: string, action: string, slug: string, id: number }> }> }> } };

export type PaginatedPermissionsQueryVariables = Exact<{
  listInputDto: ListInputDto;
}>;


export type PaginatedPermissionsQuery = { __typename?: 'Query', paginatedPermissions: { __typename?: 'PaginatedPermissions', meta: { __typename?: 'Meta', totalItems: number, totalPages: number, currentPage: number, limit: number }, data: Array<{ __typename?: 'Permissions', id: string, appName: string, groupName: string, module: string, action: string, slug: string, description: string }> } };

export type PaginatedOrganizationQueryVariables = Exact<{
  listInputDto: ListInputDto;
}>;


export type PaginatedOrganizationQuery = { __typename?: 'Query', paginatedOrganization: { __typename?: 'PaginatedOrganizations', meta: { __typename?: 'Meta', totalItems: number, totalPages: number, currentPage: number, limit: number }, data: Array<{ __typename?: 'Organization', id: string, name: string, description?: string | null, status: string }> } };

export type PaginatedProjectsQueryVariables = Exact<{
  listInputDto: ListInputDto;
}>;


export type PaginatedProjectsQuery = { __typename?: 'Query', paginatedProjects: { __typename?: 'PaginatedProjects', meta: { __typename?: 'Meta', totalItems: number, totalPages: number, currentPage: number, limit: number }, data: Array<{ __typename?: 'Project', id: string, name: string, description?: string | null, status: string, organizationId: number, organization?: { __typename?: 'Organization', name: string } | null }> } };

export type ListTrashedProjectsQueryVariables = Exact<{
  listInputDto: ListInputDto;
}>;


export type ListTrashedProjectsQuery = { __typename?: 'Query', listTrashedProjects: { __typename?: 'PaginatedProjects', data: Array<{ __typename?: 'Project', description?: string | null, id: string, name: string, organizationId: number, status: string, createdBy?: { __typename?: 'User', id: string } | null, organization?: { __typename?: 'Organization', id: string, name: string } | null }>, meta: { __typename?: 'Meta', totalItems: number, totalPages: number, currentPage: number, limit: number } } };

export type FindPermissionByIdQueryVariables = Exact<{
  findPermissionByIdId: Scalars['Float']['input'];
}>;


export type FindPermissionByIdQuery = { __typename?: 'Query', findPermissionById: { __typename?: 'Permissions', id: string, appName: string, groupName: string, module: string, action: string, slug: string, description: string } };

export type FindPermsissonByUserIdQueryVariables = Exact<{
  findPermissionsByUserId: Scalars['Float']['input'];
}>;


export type FindPermsissonByUserIdQuery = { __typename?: 'Query', findPermissionsByUser: Array<string> };

export type DashboardCountQueryVariables = Exact<{
  filters: ReportFilters;
}>;


export type DashboardCountQuery = { __typename?: 'Query', dashboardCount: { __typename?: 'DashboardCount', userCount?: number | null, roleCount?: number | null, permissionCount?: number | null, assignedPermissionCount?: number | null, projectCount?: number | null, organizationCount?: number | null, couponCount?: number | null, offerCount?: number | null, moduleCount?: number | null, packageCount?: number | null, planCount?: number | null, subscriptionCount?: number | null, packageModuleCount?: number | null, subscriptionPlanCount?: number | null, pageCount?: number | null } };

export type FindUserByIdQueryVariables = Exact<{
  findUserByIdId: Scalars['Float']['input'];
}>;


export type FindUserByIdQuery = { __typename?: 'Query', findUserById: { __typename?: 'User', id: string, name: string, username?: string | null, mobileNo?: number | null, designation?: Designation | null, email: string, status: string, avatar?: string | null, userType: UserType, parentId?: number | null } };

export type UserHierarchyQueryVariables = Exact<{
  parentId?: InputMaybe<Scalars['Int']['input']>;
  nameFilter?: InputMaybe<Scalars['String']['input']>;
}>;


export type UserHierarchyQuery = { __typename?: 'Query', userHierarchy: Array<{ __typename?: 'User', id: string, name: string, username?: string | null, mobileNo?: number | null, email: string, status: string, avatar?: string | null, parentId?: number | null, organizationId?: number | null, userType: UserType, designation?: Designation | null, subordinates?: Array<{ __typename?: 'User', name: string, designation?: Designation | null, username?: string | null, subordinates?: Array<{ __typename?: 'User', name: string, designation?: Designation | null, username?: string | null, subordinates?: Array<{ __typename?: 'User', name: string, designation?: Designation | null, username?: string | null }> | null }> | null }> | null }> };

export type PaginatedModulesQueryVariables = Exact<{
  listInputDto: ListInputDto;
}>;


export type PaginatedModulesQuery = { __typename?: 'Query', paginatedModules: { __typename?: 'PaginatedApplicationModules', meta: { __typename?: 'Meta', totalItems: number, totalPages: number, currentPage: number, limit: number }, data: Array<{ __typename?: 'ApplicationModule', id: string, name: string, description?: string | null, status: string }> } };

export type PaginatedCouponsQueryVariables = Exact<{
  listInputDto: ListInputDto;
}>;


export type PaginatedCouponsQuery = { __typename?: 'Query', paginatedCoupons: { __typename?: 'PaginatedCoupons', data: Array<{ __typename?: 'Coupon', id: string, couponCode: string, description?: string | null, minOrderAmount?: number | null, discountValue?: number | null, usageLimit: number, status: string, startDate: any, endDate: any }>, meta: { __typename?: 'Meta', totalItems: number, totalPages: number, currentPage: number, limit: number } } };

export type TrashedCouponsQueryVariables = Exact<{
  listInputDto: ListInputDto;
}>;


export type TrashedCouponsQuery = { __typename?: 'Query', trashedCoupons: { __typename?: 'PaginatedCoupons', data: Array<{ __typename?: 'Coupon', couponCode: string, description?: string | null, endDate: any, id: string, discountValue?: number | null, minOrderAmount?: number | null, startDate: any, status: string, usageLimit: number }>, meta: { __typename?: 'Meta', currentPage: number, limit: number, totalItems: number, totalPages: number } } };

export type CouponsDropdownQueryVariables = Exact<{
  listInputDto: ListInputDto;
}>;


export type CouponsDropdownQuery = { __typename?: 'Query', couponsDropdown: { __typename?: 'PaginatedCoupons', data: Array<{ __typename?: 'Coupon', id: string, couponCode: string, discountValue?: number | null }>, meta: { __typename?: 'Meta', totalItems: number, totalPages: number, currentPage: number, limit: number } } };

export type PaginatedOffersQueryVariables = Exact<{
  listInputDto: ListInputDto;
}>;


export type PaginatedOffersQuery = { __typename?: 'Query', paginatedOffers: { __typename?: 'PaginatedOffers', meta: { __typename?: 'Meta', totalItems: number, totalPages: number, currentPage: number, limit: number }, data: Array<{ __typename?: 'Offer', id: string, title: string, description?: string | null, offerType?: string | null, discountValue?: number | null, usageLimit: number, status: string, startDate: any, endDate: any }> } };

export type TrashedOffersQueryVariables = Exact<{
  listInputDto: ListInputDto;
}>;


export type TrashedOffersQuery = { __typename?: 'Query', trashedOffers: { __typename?: 'PaginatedOffers', data: Array<{ __typename?: 'Offer', description?: string | null, discountValue?: number | null, endDate: any, id: string, offerType?: string | null, startDate: any, status: string, title: string, usageLimit: number }>, meta: { __typename?: 'Meta', currentPage: number, limit: number, totalItems: number, totalPages: number } } };

export type DropdownOffersQueryVariables = Exact<{
  listInputDto: ListInputDto;
}>;


export type DropdownOffersQuery = { __typename?: 'Query', dropdownOffers: { __typename?: 'PaginatedOffers', data: Array<{ __typename?: 'Offer', id: string, title: string, discountValue?: number | null, usageLimit: number }>, meta: { __typename?: 'Meta', totalItems: number, totalPages: number, currentPage: number, limit: number } } };

export type PaginatedPackagesQueryVariables = Exact<{
  listInputDto: ListInputDto;
}>;


export type PaginatedPackagesQuery = { __typename?: 'Query', paginatedPackages: { __typename?: 'PaginatedPackages', meta: { __typename?: 'Meta', totalItems: number, totalPages: number, currentPage: number, limit: number }, data: Array<{ __typename?: 'Package', id: string, name: string, description?: string | null, price: number, discountedPrice: number, status: string, offerType?: string | null, offerDescription?: string | null, offerExpiryDate?: any | null, modules: Array<{ __typename?: 'ApplicationModule', id: string, description?: string | null, name: string, status: string }> }> } };

export type TrashedPackagesQueryVariables = Exact<{
  listInputDto: ListInputDto;
}>;


export type TrashedPackagesQuery = { __typename?: 'Query', trashedPackages: { __typename?: 'PaginatedPackages', data: Array<{ __typename?: 'Package', description?: string | null, discountedPrice: number, id: string, name: string, price: number, status: string, modules: Array<{ __typename?: 'ApplicationModule', id: string }> }>, meta: { __typename?: 'Meta', currentPage: number, limit: number, totalItems: number, totalPages: number } } };

export type FindPackageByIdQueryVariables = Exact<{
  findPackageByIdId: Scalars['Int']['input'];
}>;


export type FindPackageByIdQuery = { __typename?: 'Query', findPackageById: { __typename?: 'Package', name: string, price: number, offerExpiryDate?: any | null, offerDescription?: string | null, discountedPrice: number, description?: string | null, id: string, modules: Array<{ __typename?: 'ApplicationModule', id: string, name: string }> } };

export type PackagesDropdownQueryVariables = Exact<{
  listInputDto: ListInputDto;
}>;


export type PackagesDropdownQuery = { __typename?: 'Query', packagesDropdown: { __typename?: 'PaginatedPackages', meta: { __typename?: 'Meta', totalItems: number, totalPages: number, currentPage: number, limit: number }, data: Array<{ __typename?: 'Package', id: string, name: string, price: number }> } };

export type PaginatedPlansQueryVariables = Exact<{
  listInputDto: ListInputDto;
}>;


export type PaginatedPlansQuery = { __typename?: 'Query', paginatedPlans: { __typename?: 'PaginatedPlans', meta: { __typename?: 'Meta', totalItems: number, totalPages: number, currentPage: number, limit: number }, data: Array<{ __typename?: 'Plan', id: string, name: string, description?: string | null, price: number, duration: number, discountedPrice?: number | null, status: string, couponCode?: string | null, coupon?: { __typename?: 'Coupon', couponCode: string, id: string } | null, package?: { __typename?: 'Package', id: string, name: string, price: number } | null }> } };

export type TrashedPlansQueryVariables = Exact<{
  listInputDto: ListInputDto;
}>;


export type TrashedPlansQuery = { __typename?: 'Query', trashedPlans: { __typename?: 'PaginatedPlans', meta: { __typename?: 'Meta', totalItems: number, totalPages: number, currentPage: number, limit: number }, data: Array<{ __typename?: 'Plan', id: string, name: string, price: number, status: string, duration: number }> } };

export type PaginatedPlansForListQueryVariables = Exact<{
  listInputDto: ListInputDto;
}>;


export type PaginatedPlansForListQuery = { __typename?: 'Query', paginatedPlansForList: { __typename?: 'PaginatedPlans', meta: { __typename?: 'Meta', totalItems: number, totalPages: number, currentPage: number, limit: number }, data: Array<{ __typename?: 'Plan', id: string, name: string, description?: string | null, price: number, duration: number, discountedPrice?: number | null, status: string, couponCode?: string | null }> } };

export type FindPlanByIdQueryVariables = Exact<{
  findPlanByIdId: Scalars['Int']['input'];
}>;


export type FindPlanByIdQuery = { __typename?: 'Query', findPlanById: { __typename?: 'Plan', id: string, name: string, description?: string | null, price: number, duration: number, discountedPrice?: number | null, status: string, couponCode?: string | null } };

export type PaginatedSubscriptionsQueryVariables = Exact<{
  listInputDto: ListInputDto;
}>;


export type PaginatedSubscriptionsQuery = { __typename?: 'Query', paginatedSubscriptions: { __typename?: 'PaginatedSubscriptions', meta: { __typename?: 'Meta', totalItems: number, totalPages: number, currentPage: number, limit: number }, data: Array<{ __typename?: 'Subscriptions', id: string, name: string, price: number, duration: number, status: string, plans: Array<{ __typename?: 'Plan', id: string }> }> } };

export type TrashedUsersQueryVariables = Exact<{
  listInputDto: ListInputDto;
}>;


export type TrashedUsersQuery = { __typename?: 'Query', trashedUsers: { __typename?: 'PaginatedUsers', data: Array<{ __typename?: 'User', avatar?: string | null, createdAt: any, deletedAt?: any | null, email: string, id: string, mobileNo?: number | null, name: string, organizationId?: number | null, parentId?: number | null, status: string, updatedAt: any, userType: UserType, username?: string | null, roles?: Array<{ __typename?: 'Role', id: string, name: string }> | null }>, meta: { __typename?: 'Meta', currentPage: number, limit: number, totalItems: number, totalPages: number } } };

export type QueryQueryVariables = Exact<{
  findPermissionsByUserId: Scalars['Float']['input'];
}>;


export type QueryQuery = { __typename?: 'Query', findPermissionsByUser: Array<string> };

export type GetAllDynamicPageQueryVariables = Exact<{
  listInputDto: ListInputDto;
}>;


export type GetAllDynamicPageQuery = { __typename?: 'Query', getAllDynamicPage: { __typename?: 'PaginatedAbout', meta: { __typename?: 'Meta', totalItems: number, totalPages: number, currentPage: number, limit: number }, data: Array<{ __typename?: 'About', id: string, title: string, slug: string, description?: string | null, imageUrl?: string | null, content?: string | null, contentJson?: string | null }> } };

export type PaginatedMeetingQueryVariables = Exact<{
  listInputDto: ListInputDto;
}>;


export type PaginatedMeetingQuery = { __typename?: 'Query', paginatedMeeting: { __typename?: 'PaginatedMeeting', data: Array<{ __typename?: 'Meeting', id: string, meetingReference: string, projectId?: number | null, createdByUserId: string, meetingVenueId?: number | null, meetingTypeId: number, projectName?: string | null, parentMeetingId?: number | null, title: string, startTime: string, endTime: string, status: string, meetingDate: any, meetingAgenda?: string | null, meetingUrl?: string | null, attendees?: any | null, attendeesNames?: Array<string> | null, uploadDoc?: string | null }> } };

export type GetAllMeetingTypesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllMeetingTypesQuery = { __typename?: 'Query', getAllMeetingTypes: Array<{ __typename?: 'MeetingType', id: string, name: string }> };

export type PaginatedMeetingVenueQueryVariables = Exact<{
  listInputDto: ListInputDto;
}>;


export type PaginatedMeetingVenueQuery = { __typename?: 'Query', paginatedMeetingVenue: { __typename?: 'PaginatedMeetingVenue', data: Array<{ __typename?: 'MeetingVenue', id: string, name: string, address?: string | null, contactPerson?: string | null, contactNumber?: number | null, description?: string | null }> } };

export type PaginatedMeetingTypeQueryVariables = Exact<{
  listInputDto: ListInputDto;
}>;


export type PaginatedMeetingTypeQuery = { __typename?: 'Query', paginatedMeetingType: { __typename?: 'PaginatedMeetingType', data: Array<{ __typename?: 'MeetingType', name: string, id: string }> } };

export type DeleteMetingTypeMutationVariables = Exact<{
  ids: Array<Scalars['Int']['input']> | Scalars['Int']['input'];
}>;


export type DeleteMetingTypeMutation = { __typename?: 'Mutation', deleteMetingType: boolean };

export type PaginatedNotesQueryVariables = Exact<{
  listInputDto: ListInputDto;
}>;


export type PaginatedNotesQuery = { __typename?: 'Query', paginatedNotes: { __typename?: 'PaginatedNotes', data: Array<{ __typename?: 'Notes', decision?: string | null, id: string, meetingId?: number | null, notes?: string | null }> } };

export type GetUpcomingMeetingTaskQueryVariables = Exact<{
  listInputDto: ListInputDto;
}>;


export type GetUpcomingMeetingTaskQuery = { __typename?: 'Query', getUpcomingMeetingTask: { __typename?: 'PaginatedMeetingTask', data: Array<{ __typename?: 'MeetingTask', id: string, ownerId?: number | null, assigneeId?: number | null, meetingId?: number | null, notesId?: number | null, projectId?: number | null, parentTaskId?: number | null, task?: string | null, comment?: string | null, openedDate: any, dueDate: any, completedDate?: any | null, priority: string, status: string, completePercent?: number | null, weightType?: string | null }> } };

export type PaginatedMeetingTaskQueryVariables = Exact<{
  listInputDto: ListInputDto;
}>;


export type PaginatedMeetingTaskQuery = { __typename?: 'Query', paginatedMeetingTask: { __typename?: 'PaginatedMeetingTask', data: Array<{ __typename?: 'MeetingTask', id: string, ownerId?: number | null, assigneeId?: number | null, meetingId?: number | null, notesId?: number | null, projectId?: number | null, parentTaskId?: number | null, task?: string | null, comment?: string | null, openedDate: any, dueDate: any, completedDate?: any | null, priority: string, status: string, completePercent?: number | null, totalTaskComplete?: number | null, weightType?: string | null }> } };

export type PaginatedNotePadQueryVariables = Exact<{
  listInputDto: ListInputDto;
}>;


export type PaginatedNotePadQuery = { __typename?: 'Query', paginatedNotePad: { __typename?: 'PaginatedNotePad', data: Array<{ __typename?: 'NotePad', id: string, status: string, notesField?: string | null }> } };

export type GetUpcomingMeetingsQueryVariables = Exact<{
  listInputDto: ListInputDto;
}>;


export type GetUpcomingMeetingsQuery = { __typename?: 'Query', getUpcomingMeetings: { __typename?: 'PaginatedMeeting', data: Array<{ __typename?: 'Meeting', id: string, meetingReference: string, projectId?: number | null, createdByUserId: string, meetingVenueId?: number | null, meetingTypeId: number, projectName?: string | null, parentMeetingId?: number | null, title: string, startTime: string, endTime: string, status: string, meetingDate: any, meetingAgenda?: string | null, meetingUrl?: string | null, attendees?: any | null }> } };

export type GetMeetingDashboardQueryVariables = Exact<{ [key: string]: never; }>;


export type GetMeetingDashboardQuery = { __typename?: 'Query', getMeetingDashboard: { __typename?: 'Dashboard', totalMeetings?: number | null, activeMeetings?: number | null, inactiveMeetings?: number | null, upComingMeeting?: number | null, completedMeeting?: number | null, todayMeeting?: number | null, totalTasks?: number | null, inComingTasks?: number | null, ongoingTasks?: number | null, completedTasks?: number | null } };

export type PaginatedVehiclesQueryVariables = Exact<{
  listInputDto: ListInputDto;
}>;


export type PaginatedVehiclesQuery = { __typename?: 'Query', paginatedVehicles: { __typename?: 'PaginatedVehicles', meta: { __typename?: 'Meta', totalItems: number, totalPages: number, currentPage: number, limit: number }, data: Array<{ __typename?: 'Vehicle', id: string, make: string, model: string, year: string, color: string, chassisNumber: string, numberPlate: string, maintenanceHistory?: string | null, avatar?: string | null, insurance: boolean, insuranceValidTill?: any | null, status: string, latitude?: number | null, longitude?: number | null, createdById: number, organizationId: number, createdAt: any, updatedAt: any, deletedAt?: any | null }> } };

export type DropdownRolesQueryVariables = Exact<{
  listInputDto: ListInputDto;
}>;


export type DropdownRolesQuery = { __typename?: 'Query', dropdownRoles: { __typename?: 'PaginatedRoles', meta: { __typename?: 'Meta', totalItems: number, totalPages: number, currentPage: number, limit: number }, data: Array<{ __typename?: 'Role', id: string, name: string, description?: string | null, roleType?: string | null, status: string, permissionCount: number, organization?: { __typename?: 'Organization', id: string, name: string, description?: string | null, status: string } | null }> } };

export type GetPaginatedNotesByMeetingIdQueryVariables = Exact<{
  meetingId: Scalars['Int']['input'];
  query: ListInputDto;
}>;


export type GetPaginatedNotesByMeetingIdQuery = { __typename?: 'Query', getPaginatedNotesByMeetingId: { __typename?: 'PaginatedNotes', data: Array<{ __typename?: 'Notes', id: string, createdByUserId: string, meetingId?: number | null, decision?: string | null, notes?: string | null }> } };

export type GetPaginatedMeetingTaskByMeetingIdQueryVariables = Exact<{
  meetingId: Scalars['Int']['input'];
  query: ListInputDto;
}>;


export type GetPaginatedMeetingTaskByMeetingIdQuery = { __typename?: 'Query', getPaginatedMeetingTaskByMeetingId: { __typename?: 'PaginatedMeetingTask', data: Array<{ __typename?: 'MeetingTask', id: string, ownerId?: number | null, createdByUserId: string, assigneeId?: number | null, meetingId?: number | null, notesId?: number | null, projectId?: number | null, parentTaskId?: number | null, ownerName?: string | null, assigneeName?: string | null, task?: string | null, projectName?: string | null, comment?: string | null, openedDate: any, dueDate: any, completedDate?: any | null, priority: string, status: string, completePercent?: number | null, totalTaskComplete?: number | null, weightType?: string | null }> } };

export type PaginatedBreakdownsQueryVariables = Exact<{
  listInputDto: ListInputDto;
}>;


export type PaginatedBreakdownsQuery = { __typename?: 'Query', paginatedBreakdowns: { __typename?: 'PaginatedBreakdowns', data: Array<{ __typename?: 'Breakdown', id: string, vehicleId: number, breakdownType?: string | null, breakdownDate: any, breakdownDescription?: string | null, breakdownLocation: string, latitude: string, longitude: string, status: string, organizationId: number, createdById?: number | null, createdAt: any, updatedAt: any, vehicle: { __typename?: 'Vehicle', id: string, make: string, model: string, year: string, color: string, chassisNumber: string, numberPlate: string, maintenanceHistory?: string | null, avatar?: string | null, insurance: boolean, insuranceValidTill?: any | null, status: string, latitude?: number | null, longitude?: number | null, createdById: number, organizationId: number, createdAt: any, updatedAt: any, deletedAt?: any | null } }> } };

export type ListTrashedMeetingQueryVariables = Exact<{
  listInputDto: ListInputDto;
}>;


export type ListTrashedMeetingQuery = { __typename?: 'Query', listTrashedMeeting: { __typename?: 'PaginatedMeeting', data: Array<{ __typename?: 'Meeting', id: string, meetingReference: string, projectId?: number | null, createdByUserId: string, meetingVenueId?: number | null, meetingTypeId: number, projectName?: string | null, parentMeetingId?: number | null, title: string, startTime: string, endTime: string, status: string, meetingDate: any, meetingAgenda?: string | null, meetingUrl?: string | null }> } };

export type PaginatedActivityLogMeetingQueryVariables = Exact<{
  listInputDto: ListInputDto;
}>;


export type PaginatedActivityLogMeetingQuery = { __typename?: 'Query', paginatedActivityLogMeeting: { __typename?: 'PaginatedActivity', data: Array<{ __typename?: 'Activity', id: string, createdByUserId: number, module: string, moduleId?: number | null, description?: string | null, activity: string, ipAddress: string, userAgent: string }> } };

export type ListTrashedFollowUpQueryVariables = Exact<{
  listInputDto: ListInputDto;
}>;


export type ListTrashedFollowUpQuery = { __typename?: 'Query', listTrashedFollowUp: { __typename?: 'PaginatedFollowUp', data: Array<{ __typename?: 'FollowUp', id: number, userId?: number | null, followUpId?: number | null, subject?: string | null, body?: string | null, createdById: number }> } };

export type PaginatedFollowUpQueryVariables = Exact<{
  listInputDto: ListInputDto;
}>;


export type PaginatedFollowUpQuery = { __typename?: 'Query', paginatedFollowUp: { __typename?: 'PaginatedFollowUp', data: Array<{ __typename?: 'FollowUp', id: number, userId?: number | null, followUpId?: number | null, subject?: string | null, body?: string | null, createdById: number }> } };

export type PaginatedMilestoneQueryVariables = Exact<{
  listInputDto: ListInputDto;
}>;


export type PaginatedMilestoneQuery = { __typename?: 'Query', paginatedMilestone: { __typename?: 'PaginatedMilestone', data: Array<{ __typename?: 'Milestone', id: string, projectId: number, name: string, startDate: any, endDate: any, projectName?: string | null, totalTaskCompleteMilestone?: number | null, status: string }> } };


export const PaginatedRolesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"PaginatedRoles"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"listInputDto"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ListInputDTO"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"paginatedRoles"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"ListInputDTO"},"value":{"kind":"Variable","name":{"kind":"Name","value":"listInputDto"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"meta"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"totalItems"}},{"kind":"Field","name":{"kind":"Name","value":"totalPages"}},{"kind":"Field","name":{"kind":"Name","value":"currentPage"}},{"kind":"Field","name":{"kind":"Name","value":"limit"}}]}},{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"roleType"}},{"kind":"Field","name":{"kind":"Name","value":"permissionCount"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}}]}}]}}]} as unknown as DocumentNode<PaginatedRolesQuery, PaginatedRolesQueryVariables>;
export const ListTrashedRolesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ListTrashedRoles"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"listInputDto"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ListInputDTO"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"listTrashedRoles"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"ListInputDTO"},"value":{"kind":"Variable","name":{"kind":"Name","value":"listInputDto"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"organization"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}},{"kind":"Field","name":{"kind":"Name","value":"permissionCount"}},{"kind":"Field","name":{"kind":"Name","value":"roleType"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}},{"kind":"Field","name":{"kind":"Name","value":"meta"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"currentPage"}},{"kind":"Field","name":{"kind":"Name","value":"limit"}},{"kind":"Field","name":{"kind":"Name","value":"totalItems"}},{"kind":"Field","name":{"kind":"Name","value":"totalPages"}}]}}]}}]}}]} as unknown as DocumentNode<ListTrashedRolesQuery, ListTrashedRolesQueryVariables>;
export const FindRoleByIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"FindRoleById"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"findRoleByIdId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"findRoleById"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"findRoleByIdId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"permissions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]} as unknown as DocumentNode<FindRoleByIdQuery, FindRoleByIdQueryVariables>;
export const PaginatedUsersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"PaginatedUsers"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"listInputDto"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ListInputDTO"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"paginatedUsers"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"ListInputDTO"},"value":{"kind":"Variable","name":{"kind":"Name","value":"listInputDto"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"meta"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"totalItems"}},{"kind":"Field","name":{"kind":"Name","value":"totalPages"}},{"kind":"Field","name":{"kind":"Name","value":"currentPage"}},{"kind":"Field","name":{"kind":"Name","value":"limit"}}]}},{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"mobileNo"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"}},{"kind":"Field","name":{"kind":"Name","value":"userType"}},{"kind":"Field","name":{"kind":"Name","value":"designation"}},{"kind":"Field","name":{"kind":"Name","value":"roles"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]}}]} as unknown as DocumentNode<PaginatedUsersQuery, PaginatedUsersQueryVariables>;
export const AllPermissionsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"AllPermissions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"allPermissions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"apps"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"appName"}},{"kind":"Field","name":{"kind":"Name","value":"modules"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"permissions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"module"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"action"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<AllPermissionsQuery, AllPermissionsQueryVariables>;
export const PaginatedPermissionsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"PaginatedPermissions"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"listInputDto"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ListInputDTO"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"paginatedPermissions"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"ListInputDTO"},"value":{"kind":"Variable","name":{"kind":"Name","value":"listInputDto"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"meta"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"totalItems"}},{"kind":"Field","name":{"kind":"Name","value":"totalPages"}},{"kind":"Field","name":{"kind":"Name","value":"currentPage"}},{"kind":"Field","name":{"kind":"Name","value":"limit"}}]}},{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"appName"}},{"kind":"Field","name":{"kind":"Name","value":"groupName"}},{"kind":"Field","name":{"kind":"Name","value":"module"}},{"kind":"Field","name":{"kind":"Name","value":"action"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}}]}}]}}]} as unknown as DocumentNode<PaginatedPermissionsQuery, PaginatedPermissionsQueryVariables>;
export const PaginatedOrganizationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"PaginatedOrganization"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"listInputDto"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ListInputDTO"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"paginatedOrganization"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"ListInputDTO"},"value":{"kind":"Variable","name":{"kind":"Name","value":"listInputDto"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"meta"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"totalItems"}},{"kind":"Field","name":{"kind":"Name","value":"totalPages"}},{"kind":"Field","name":{"kind":"Name","value":"currentPage"}},{"kind":"Field","name":{"kind":"Name","value":"limit"}}]}},{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}}]}}]}}]} as unknown as DocumentNode<PaginatedOrganizationQuery, PaginatedOrganizationQueryVariables>;
export const PaginatedProjectsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"PaginatedProjects"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"listInputDto"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ListInputDTO"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"paginatedProjects"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"ListInputDTO"},"value":{"kind":"Variable","name":{"kind":"Name","value":"listInputDto"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"meta"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"totalItems"}},{"kind":"Field","name":{"kind":"Name","value":"totalPages"}},{"kind":"Field","name":{"kind":"Name","value":"currentPage"}},{"kind":"Field","name":{"kind":"Name","value":"limit"}}]}},{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"organizationId"}},{"kind":"Field","name":{"kind":"Name","value":"organization"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]}}]} as unknown as DocumentNode<PaginatedProjectsQuery, PaginatedProjectsQueryVariables>;
export const ListTrashedProjectsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ListTrashedProjects"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"listInputDto"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ListInputDTO"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"listTrashedProjects"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"ListInputDTO"},"value":{"kind":"Variable","name":{"kind":"Name","value":"listInputDto"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createdBy"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"organization"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"organizationId"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}},{"kind":"Field","name":{"kind":"Name","value":"meta"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"totalItems"}},{"kind":"Field","name":{"kind":"Name","value":"totalPages"}},{"kind":"Field","name":{"kind":"Name","value":"currentPage"}},{"kind":"Field","name":{"kind":"Name","value":"limit"}}]}}]}}]}}]} as unknown as DocumentNode<ListTrashedProjectsQuery, ListTrashedProjectsQueryVariables>;
export const FindPermissionByIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"FindPermissionById"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"findPermissionByIdId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"findPermissionById"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"findPermissionByIdId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"appName"}},{"kind":"Field","name":{"kind":"Name","value":"groupName"}},{"kind":"Field","name":{"kind":"Name","value":"module"}},{"kind":"Field","name":{"kind":"Name","value":"action"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}}]}}]} as unknown as DocumentNode<FindPermissionByIdQuery, FindPermissionByIdQueryVariables>;
export const FindPermsissonByUserIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"FindPermsissonByUserId"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"findPermissionsByUserId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"findPermissionsByUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"findPermissionsByUserId"}}}]}]}}]} as unknown as DocumentNode<FindPermsissonByUserIdQuery, FindPermsissonByUserIdQueryVariables>;
export const DashboardCountDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"DashboardCount"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filters"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ReportFilters"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"dashboardCount"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filters"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filters"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userCount"}},{"kind":"Field","name":{"kind":"Name","value":"roleCount"}},{"kind":"Field","name":{"kind":"Name","value":"permissionCount"}},{"kind":"Field","name":{"kind":"Name","value":"assignedPermissionCount"}},{"kind":"Field","name":{"kind":"Name","value":"projectCount"}},{"kind":"Field","name":{"kind":"Name","value":"organizationCount"}},{"kind":"Field","name":{"kind":"Name","value":"couponCount"}},{"kind":"Field","name":{"kind":"Name","value":"offerCount"}},{"kind":"Field","name":{"kind":"Name","value":"moduleCount"}},{"kind":"Field","name":{"kind":"Name","value":"packageCount"}},{"kind":"Field","name":{"kind":"Name","value":"planCount"}},{"kind":"Field","name":{"kind":"Name","value":"subscriptionCount"}},{"kind":"Field","name":{"kind":"Name","value":"packageModuleCount"}},{"kind":"Field","name":{"kind":"Name","value":"subscriptionPlanCount"}},{"kind":"Field","name":{"kind":"Name","value":"pageCount"}}]}}]}}]} as unknown as DocumentNode<DashboardCountQuery, DashboardCountQueryVariables>;
export const FindUserByIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"FindUserById"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"findUserByIdId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"findUserById"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"findUserByIdId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"mobileNo"}},{"kind":"Field","name":{"kind":"Name","value":"designation"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"}},{"kind":"Field","name":{"kind":"Name","value":"userType"}},{"kind":"Field","name":{"kind":"Name","value":"parentId"}}]}}]}}]} as unknown as DocumentNode<FindUserByIdQuery, FindUserByIdQueryVariables>;
export const UserHierarchyDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"UserHierarchy"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"parentId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"nameFilter"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userHierarchy"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"parentId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"parentId"}}},{"kind":"Argument","name":{"kind":"Name","value":"nameFilter"},"value":{"kind":"Variable","name":{"kind":"Name","value":"nameFilter"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"mobileNo"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"}},{"kind":"Field","name":{"kind":"Name","value":"parentId"}},{"kind":"Field","name":{"kind":"Name","value":"organizationId"}},{"kind":"Field","name":{"kind":"Name","value":"userType"}},{"kind":"Field","name":{"kind":"Name","value":"designation"}},{"kind":"Field","name":{"kind":"Name","value":"subordinates"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"designation"}},{"kind":"Field","name":{"kind":"Name","value":"subordinates"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"designation"}},{"kind":"Field","name":{"kind":"Name","value":"subordinates"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"designation"}},{"kind":"Field","name":{"kind":"Name","value":"username"}}]}},{"kind":"Field","name":{"kind":"Name","value":"username"}}]}},{"kind":"Field","name":{"kind":"Name","value":"username"}}]}}]}}]}}]} as unknown as DocumentNode<UserHierarchyQuery, UserHierarchyQueryVariables>;
export const PaginatedModulesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"PaginatedModules"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"listInputDto"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ListInputDTO"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"paginatedModules"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"ListInputDTO"},"value":{"kind":"Variable","name":{"kind":"Name","value":"listInputDto"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"meta"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"totalItems"}},{"kind":"Field","name":{"kind":"Name","value":"totalPages"}},{"kind":"Field","name":{"kind":"Name","value":"currentPage"}},{"kind":"Field","name":{"kind":"Name","value":"limit"}}]}},{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}}]}}]}}]} as unknown as DocumentNode<PaginatedModulesQuery, PaginatedModulesQueryVariables>;
export const PaginatedCouponsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"PaginatedCoupons"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"listInputDto"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ListInputDTO"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"paginatedCoupons"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"ListInputDTO"},"value":{"kind":"Variable","name":{"kind":"Name","value":"listInputDto"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"couponCode"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"minOrderAmount"}},{"kind":"Field","name":{"kind":"Name","value":"discountValue"}},{"kind":"Field","name":{"kind":"Name","value":"usageLimit"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"startDate"}},{"kind":"Field","name":{"kind":"Name","value":"endDate"}}]}},{"kind":"Field","name":{"kind":"Name","value":"meta"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"totalItems"}},{"kind":"Field","name":{"kind":"Name","value":"totalPages"}},{"kind":"Field","name":{"kind":"Name","value":"currentPage"}},{"kind":"Field","name":{"kind":"Name","value":"limit"}}]}}]}}]}}]} as unknown as DocumentNode<PaginatedCouponsQuery, PaginatedCouponsQueryVariables>;
export const TrashedCouponsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"TrashedCoupons"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"listInputDto"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ListInputDTO"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"trashedCoupons"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"ListInputDTO"},"value":{"kind":"Variable","name":{"kind":"Name","value":"listInputDto"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"couponCode"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"endDate"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"discountValue"}},{"kind":"Field","name":{"kind":"Name","value":"minOrderAmount"}},{"kind":"Field","name":{"kind":"Name","value":"startDate"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"usageLimit"}}]}},{"kind":"Field","name":{"kind":"Name","value":"meta"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"currentPage"}},{"kind":"Field","name":{"kind":"Name","value":"limit"}},{"kind":"Field","name":{"kind":"Name","value":"totalItems"}},{"kind":"Field","name":{"kind":"Name","value":"totalPages"}}]}}]}}]}}]} as unknown as DocumentNode<TrashedCouponsQuery, TrashedCouponsQueryVariables>;
export const CouponsDropdownDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"CouponsDropdown"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"listInputDto"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ListInputDTO"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"couponsDropdown"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"ListInputDTO"},"value":{"kind":"Variable","name":{"kind":"Name","value":"listInputDto"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"couponCode"}},{"kind":"Field","name":{"kind":"Name","value":"discountValue"}}]}},{"kind":"Field","name":{"kind":"Name","value":"meta"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"totalItems"}},{"kind":"Field","name":{"kind":"Name","value":"totalPages"}},{"kind":"Field","name":{"kind":"Name","value":"currentPage"}},{"kind":"Field","name":{"kind":"Name","value":"limit"}}]}}]}}]}}]} as unknown as DocumentNode<CouponsDropdownQuery, CouponsDropdownQueryVariables>;
export const PaginatedOffersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"PaginatedOffers"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"listInputDto"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ListInputDTO"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"paginatedOffers"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"ListInputDTO"},"value":{"kind":"Variable","name":{"kind":"Name","value":"listInputDto"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"meta"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"totalItems"}},{"kind":"Field","name":{"kind":"Name","value":"totalPages"}},{"kind":"Field","name":{"kind":"Name","value":"currentPage"}},{"kind":"Field","name":{"kind":"Name","value":"limit"}}]}},{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"offerType"}},{"kind":"Field","name":{"kind":"Name","value":"discountValue"}},{"kind":"Field","name":{"kind":"Name","value":"usageLimit"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"startDate"}},{"kind":"Field","name":{"kind":"Name","value":"endDate"}}]}}]}}]}}]} as unknown as DocumentNode<PaginatedOffersQuery, PaginatedOffersQueryVariables>;
export const TrashedOffersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"TrashedOffers"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"listInputDto"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ListInputDTO"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"trashedOffers"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"ListInputDTO"},"value":{"kind":"Variable","name":{"kind":"Name","value":"listInputDto"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"discountValue"}},{"kind":"Field","name":{"kind":"Name","value":"endDate"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"offerType"}},{"kind":"Field","name":{"kind":"Name","value":"startDate"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"usageLimit"}}]}},{"kind":"Field","name":{"kind":"Name","value":"meta"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"currentPage"}},{"kind":"Field","name":{"kind":"Name","value":"limit"}},{"kind":"Field","name":{"kind":"Name","value":"totalItems"}},{"kind":"Field","name":{"kind":"Name","value":"totalPages"}}]}}]}}]}}]} as unknown as DocumentNode<TrashedOffersQuery, TrashedOffersQueryVariables>;
export const DropdownOffersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"DropdownOffers"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"listInputDto"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ListInputDTO"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"dropdownOffers"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"ListInputDTO"},"value":{"kind":"Variable","name":{"kind":"Name","value":"listInputDto"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"discountValue"}},{"kind":"Field","name":{"kind":"Name","value":"usageLimit"}}]}},{"kind":"Field","name":{"kind":"Name","value":"meta"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"totalItems"}},{"kind":"Field","name":{"kind":"Name","value":"totalPages"}},{"kind":"Field","name":{"kind":"Name","value":"currentPage"}},{"kind":"Field","name":{"kind":"Name","value":"limit"}}]}}]}}]}}]} as unknown as DocumentNode<DropdownOffersQuery, DropdownOffersQueryVariables>;
export const PaginatedPackagesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"PaginatedPackages"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"listInputDto"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ListInputDTO"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"paginatedPackages"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"ListInputDTO"},"value":{"kind":"Variable","name":{"kind":"Name","value":"listInputDto"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"meta"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"totalItems"}},{"kind":"Field","name":{"kind":"Name","value":"totalPages"}},{"kind":"Field","name":{"kind":"Name","value":"currentPage"}},{"kind":"Field","name":{"kind":"Name","value":"limit"}}]}},{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"discountedPrice"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"offerType"}},{"kind":"Field","name":{"kind":"Name","value":"offerDescription"}},{"kind":"Field","name":{"kind":"Name","value":"offerExpiryDate"}},{"kind":"Field","name":{"kind":"Name","value":"modules"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}}]}}]}}]}}]} as unknown as DocumentNode<PaginatedPackagesQuery, PaginatedPackagesQueryVariables>;
export const TrashedPackagesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"TrashedPackages"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"listInputDto"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ListInputDTO"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"trashedPackages"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"ListInputDTO"},"value":{"kind":"Variable","name":{"kind":"Name","value":"listInputDto"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"discountedPrice"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"modules"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}},{"kind":"Field","name":{"kind":"Name","value":"meta"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"currentPage"}},{"kind":"Field","name":{"kind":"Name","value":"limit"}},{"kind":"Field","name":{"kind":"Name","value":"totalItems"}},{"kind":"Field","name":{"kind":"Name","value":"totalPages"}}]}}]}}]}}]} as unknown as DocumentNode<TrashedPackagesQuery, TrashedPackagesQueryVariables>;
export const FindPackageByIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"FindPackageById"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"findPackageByIdId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"findPackageById"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"findPackageByIdId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"offerExpiryDate"}},{"kind":"Field","name":{"kind":"Name","value":"offerDescription"}},{"kind":"Field","name":{"kind":"Name","value":"discountedPrice"}},{"kind":"Field","name":{"kind":"Name","value":"modules"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<FindPackageByIdQuery, FindPackageByIdQueryVariables>;
export const PackagesDropdownDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"PackagesDropdown"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"listInputDto"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ListInputDTO"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"packagesDropdown"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"ListInputDTO"},"value":{"kind":"Variable","name":{"kind":"Name","value":"listInputDto"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"meta"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"totalItems"}},{"kind":"Field","name":{"kind":"Name","value":"totalPages"}},{"kind":"Field","name":{"kind":"Name","value":"currentPage"}},{"kind":"Field","name":{"kind":"Name","value":"limit"}}]}},{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"price"}}]}}]}}]}}]} as unknown as DocumentNode<PackagesDropdownQuery, PackagesDropdownQueryVariables>;
export const PaginatedPlansDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"PaginatedPlans"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"listInputDto"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ListInputDTO"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"paginatedPlans"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"ListInputDTO"},"value":{"kind":"Variable","name":{"kind":"Name","value":"listInputDto"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"meta"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"totalItems"}},{"kind":"Field","name":{"kind":"Name","value":"totalPages"}},{"kind":"Field","name":{"kind":"Name","value":"currentPage"}},{"kind":"Field","name":{"kind":"Name","value":"limit"}}]}},{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"duration"}},{"kind":"Field","name":{"kind":"Name","value":"discountedPrice"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"couponCode"}},{"kind":"Field","name":{"kind":"Name","value":"coupon"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"couponCode"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"package"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"price"}}]}}]}}]}}]}}]} as unknown as DocumentNode<PaginatedPlansQuery, PaginatedPlansQueryVariables>;
export const TrashedPlansDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"TrashedPlans"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"listInputDto"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ListInputDTO"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"trashedPlans"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"ListInputDTO"},"value":{"kind":"Variable","name":{"kind":"Name","value":"listInputDto"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"meta"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"totalItems"}},{"kind":"Field","name":{"kind":"Name","value":"totalPages"}},{"kind":"Field","name":{"kind":"Name","value":"currentPage"}},{"kind":"Field","name":{"kind":"Name","value":"limit"}}]}},{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"duration"}}]}}]}}]}}]} as unknown as DocumentNode<TrashedPlansQuery, TrashedPlansQueryVariables>;
export const PaginatedPlansForListDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"PaginatedPlansForList"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"listInputDto"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ListInputDTO"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"paginatedPlansForList"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"ListInputDTO"},"value":{"kind":"Variable","name":{"kind":"Name","value":"listInputDto"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"meta"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"totalItems"}},{"kind":"Field","name":{"kind":"Name","value":"totalPages"}},{"kind":"Field","name":{"kind":"Name","value":"currentPage"}},{"kind":"Field","name":{"kind":"Name","value":"limit"}}]}},{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"duration"}},{"kind":"Field","name":{"kind":"Name","value":"discountedPrice"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"couponCode"}}]}}]}}]}}]} as unknown as DocumentNode<PaginatedPlansForListQuery, PaginatedPlansForListQueryVariables>;
export const FindPlanByIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"FindPlanById"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"findPlanByIdId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"findPlanById"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"findPlanByIdId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"duration"}},{"kind":"Field","name":{"kind":"Name","value":"discountedPrice"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"couponCode"}}]}}]}}]} as unknown as DocumentNode<FindPlanByIdQuery, FindPlanByIdQueryVariables>;
export const PaginatedSubscriptionsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"PaginatedSubscriptions"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"listInputDto"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ListInputDTO"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"paginatedSubscriptions"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"ListInputDTO"},"value":{"kind":"Variable","name":{"kind":"Name","value":"listInputDto"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"meta"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"totalItems"}},{"kind":"Field","name":{"kind":"Name","value":"totalPages"}},{"kind":"Field","name":{"kind":"Name","value":"currentPage"}},{"kind":"Field","name":{"kind":"Name","value":"limit"}}]}},{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"duration"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"plans"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]}}]} as unknown as DocumentNode<PaginatedSubscriptionsQuery, PaginatedSubscriptionsQueryVariables>;
export const TrashedUsersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"TrashedUsers"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"listInputDto"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ListInputDTO"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"trashedUsers"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"ListInputDTO"},"value":{"kind":"Variable","name":{"kind":"Name","value":"listInputDto"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"avatar"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"deletedAt"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"mobileNo"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"organizationId"}},{"kind":"Field","name":{"kind":"Name","value":"parentId"}},{"kind":"Field","name":{"kind":"Name","value":"roles"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"userType"}},{"kind":"Field","name":{"kind":"Name","value":"username"}}]}},{"kind":"Field","name":{"kind":"Name","value":"meta"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"currentPage"}},{"kind":"Field","name":{"kind":"Name","value":"limit"}},{"kind":"Field","name":{"kind":"Name","value":"totalItems"}},{"kind":"Field","name":{"kind":"Name","value":"totalPages"}}]}}]}}]}}]} as unknown as DocumentNode<TrashedUsersQuery, TrashedUsersQueryVariables>;
export const QueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Query"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"findPermissionsByUserId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"findPermissionsByUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"findPermissionsByUserId"}}}]}]}}]} as unknown as DocumentNode<QueryQuery, QueryQueryVariables>;
export const GetAllDynamicPageDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetAllDynamicPage"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"listInputDto"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ListInputDTO"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getAllDynamicPage"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"ListInputDTO"},"value":{"kind":"Variable","name":{"kind":"Name","value":"listInputDto"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"meta"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"totalItems"}},{"kind":"Field","name":{"kind":"Name","value":"totalPages"}},{"kind":"Field","name":{"kind":"Name","value":"currentPage"}},{"kind":"Field","name":{"kind":"Name","value":"limit"}}]}},{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"contentJson"}}]}}]}}]}}]} as unknown as DocumentNode<GetAllDynamicPageQuery, GetAllDynamicPageQueryVariables>;
export const PaginatedMeetingDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"PaginatedMeeting"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"listInputDto"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ListInputDTO"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"paginatedMeeting"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"ListInputDTO"},"value":{"kind":"Variable","name":{"kind":"Name","value":"listInputDto"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"meetingReference"}},{"kind":"Field","name":{"kind":"Name","value":"projectId"}},{"kind":"Field","name":{"kind":"Name","value":"createdByUserId"}},{"kind":"Field","name":{"kind":"Name","value":"meetingVenueId"}},{"kind":"Field","name":{"kind":"Name","value":"meetingTypeId"}},{"kind":"Field","name":{"kind":"Name","value":"projectName"}},{"kind":"Field","name":{"kind":"Name","value":"parentMeetingId"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"startTime"}},{"kind":"Field","name":{"kind":"Name","value":"endTime"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"meetingDate"}},{"kind":"Field","name":{"kind":"Name","value":"meetingAgenda"}},{"kind":"Field","name":{"kind":"Name","value":"meetingUrl"}},{"kind":"Field","name":{"kind":"Name","value":"attendees"}},{"kind":"Field","name":{"kind":"Name","value":"attendeesNames"}},{"kind":"Field","name":{"kind":"Name","value":"uploadDoc"}}]}}]}}]}}]} as unknown as DocumentNode<PaginatedMeetingQuery, PaginatedMeetingQueryVariables>;
export const GetAllMeetingTypesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetAllMeetingTypes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getAllMeetingTypes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<GetAllMeetingTypesQuery, GetAllMeetingTypesQueryVariables>;
export const PaginatedMeetingVenueDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"PaginatedMeetingVenue"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"listInputDto"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ListInputDTO"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"paginatedMeetingVenue"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"ListInputDTO"},"value":{"kind":"Variable","name":{"kind":"Name","value":"listInputDto"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"contactPerson"}},{"kind":"Field","name":{"kind":"Name","value":"contactNumber"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}}]}}]}}]} as unknown as DocumentNode<PaginatedMeetingVenueQuery, PaginatedMeetingVenueQueryVariables>;
export const PaginatedMeetingTypeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"PaginatedMeetingType"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"listInputDto"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ListInputDTO"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"paginatedMeetingType"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"ListInputDTO"},"value":{"kind":"Variable","name":{"kind":"Name","value":"listInputDto"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]} as unknown as DocumentNode<PaginatedMeetingTypeQuery, PaginatedMeetingTypeQueryVariables>;
export const DeleteMetingTypeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteMetingType"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"ids"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteMetingType"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"ids"},"value":{"kind":"Variable","name":{"kind":"Name","value":"ids"}}}]}]}}]} as unknown as DocumentNode<DeleteMetingTypeMutation, DeleteMetingTypeMutationVariables>;
export const PaginatedNotesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"PaginatedNotes"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"listInputDto"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ListInputDTO"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"paginatedNotes"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"ListInputDTO"},"value":{"kind":"Variable","name":{"kind":"Name","value":"listInputDto"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"decision"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"meetingId"}},{"kind":"Field","name":{"kind":"Name","value":"notes"}}]}}]}}]}}]} as unknown as DocumentNode<PaginatedNotesQuery, PaginatedNotesQueryVariables>;
export const GetUpcomingMeetingTaskDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetUpcomingMeetingTask"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"listInputDto"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ListInputDTO"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getUpcomingMeetingTask"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"ListInputDTO"},"value":{"kind":"Variable","name":{"kind":"Name","value":"listInputDto"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"ownerId"}},{"kind":"Field","name":{"kind":"Name","value":"assigneeId"}},{"kind":"Field","name":{"kind":"Name","value":"meetingId"}},{"kind":"Field","name":{"kind":"Name","value":"notesId"}},{"kind":"Field","name":{"kind":"Name","value":"projectId"}},{"kind":"Field","name":{"kind":"Name","value":"parentTaskId"}},{"kind":"Field","name":{"kind":"Name","value":"task"}},{"kind":"Field","name":{"kind":"Name","value":"comment"}},{"kind":"Field","name":{"kind":"Name","value":"openedDate"}},{"kind":"Field","name":{"kind":"Name","value":"dueDate"}},{"kind":"Field","name":{"kind":"Name","value":"completedDate"}},{"kind":"Field","name":{"kind":"Name","value":"priority"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"completePercent"}},{"kind":"Field","name":{"kind":"Name","value":"weightType"}}]}}]}}]}}]} as unknown as DocumentNode<GetUpcomingMeetingTaskQuery, GetUpcomingMeetingTaskQueryVariables>;
export const PaginatedMeetingTaskDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"PaginatedMeetingTask"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"listInputDto"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ListInputDTO"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"paginatedMeetingTask"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"ListInputDTO"},"value":{"kind":"Variable","name":{"kind":"Name","value":"listInputDto"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"ownerId"}},{"kind":"Field","name":{"kind":"Name","value":"assigneeId"}},{"kind":"Field","name":{"kind":"Name","value":"meetingId"}},{"kind":"Field","name":{"kind":"Name","value":"notesId"}},{"kind":"Field","name":{"kind":"Name","value":"projectId"}},{"kind":"Field","name":{"kind":"Name","value":"parentTaskId"}},{"kind":"Field","name":{"kind":"Name","value":"task"}},{"kind":"Field","name":{"kind":"Name","value":"comment"}},{"kind":"Field","name":{"kind":"Name","value":"openedDate"}},{"kind":"Field","name":{"kind":"Name","value":"dueDate"}},{"kind":"Field","name":{"kind":"Name","value":"completedDate"}},{"kind":"Field","name":{"kind":"Name","value":"priority"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"completePercent"}},{"kind":"Field","name":{"kind":"Name","value":"totalTaskComplete"}},{"kind":"Field","name":{"kind":"Name","value":"weightType"}}]}}]}}]}}]} as unknown as DocumentNode<PaginatedMeetingTaskQuery, PaginatedMeetingTaskQueryVariables>;
export const PaginatedNotePadDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"PaginatedNotePad"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"listInputDto"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ListInputDTO"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"paginatedNotePad"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"ListInputDTO"},"value":{"kind":"Variable","name":{"kind":"Name","value":"listInputDto"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"notesField"}}]}}]}}]}}]} as unknown as DocumentNode<PaginatedNotePadQuery, PaginatedNotePadQueryVariables>;
export const GetUpcomingMeetingsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetUpcomingMeetings"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"listInputDto"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ListInputDTO"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getUpcomingMeetings"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"ListInputDTO"},"value":{"kind":"Variable","name":{"kind":"Name","value":"listInputDto"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"meetingReference"}},{"kind":"Field","name":{"kind":"Name","value":"projectId"}},{"kind":"Field","name":{"kind":"Name","value":"createdByUserId"}},{"kind":"Field","name":{"kind":"Name","value":"meetingVenueId"}},{"kind":"Field","name":{"kind":"Name","value":"meetingTypeId"}},{"kind":"Field","name":{"kind":"Name","value":"projectName"}},{"kind":"Field","name":{"kind":"Name","value":"parentMeetingId"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"startTime"}},{"kind":"Field","name":{"kind":"Name","value":"endTime"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"meetingDate"}},{"kind":"Field","name":{"kind":"Name","value":"meetingAgenda"}},{"kind":"Field","name":{"kind":"Name","value":"meetingUrl"}},{"kind":"Field","name":{"kind":"Name","value":"attendees"}}]}}]}}]}}]} as unknown as DocumentNode<GetUpcomingMeetingsQuery, GetUpcomingMeetingsQueryVariables>;
export const GetMeetingDashboardDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetMeetingDashboard"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getMeetingDashboard"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"totalMeetings"}},{"kind":"Field","name":{"kind":"Name","value":"activeMeetings"}},{"kind":"Field","name":{"kind":"Name","value":"inactiveMeetings"}},{"kind":"Field","name":{"kind":"Name","value":"upComingMeeting"}},{"kind":"Field","name":{"kind":"Name","value":"completedMeeting"}},{"kind":"Field","name":{"kind":"Name","value":"todayMeeting"}},{"kind":"Field","name":{"kind":"Name","value":"totalTasks"}},{"kind":"Field","name":{"kind":"Name","value":"inComingTasks"}},{"kind":"Field","name":{"kind":"Name","value":"ongoingTasks"}},{"kind":"Field","name":{"kind":"Name","value":"completedTasks"}}]}}]}}]} as unknown as DocumentNode<GetMeetingDashboardQuery, GetMeetingDashboardQueryVariables>;
export const PaginatedVehiclesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"PaginatedVehicles"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"listInputDto"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ListInputDTO"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"paginatedVehicles"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"ListInputDTO"},"value":{"kind":"Variable","name":{"kind":"Name","value":"listInputDto"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"meta"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"totalItems"}},{"kind":"Field","name":{"kind":"Name","value":"totalPages"}},{"kind":"Field","name":{"kind":"Name","value":"currentPage"}},{"kind":"Field","name":{"kind":"Name","value":"limit"}}]}},{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"make"}},{"kind":"Field","name":{"kind":"Name","value":"model"}},{"kind":"Field","name":{"kind":"Name","value":"year"}},{"kind":"Field","name":{"kind":"Name","value":"color"}},{"kind":"Field","name":{"kind":"Name","value":"chassisNumber"}},{"kind":"Field","name":{"kind":"Name","value":"numberPlate"}},{"kind":"Field","name":{"kind":"Name","value":"maintenanceHistory"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"}},{"kind":"Field","name":{"kind":"Name","value":"insurance"}},{"kind":"Field","name":{"kind":"Name","value":"insuranceValidTill"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"latitude"}},{"kind":"Field","name":{"kind":"Name","value":"longitude"}},{"kind":"Field","name":{"kind":"Name","value":"createdById"}},{"kind":"Field","name":{"kind":"Name","value":"organizationId"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"deletedAt"}}]}}]}}]}}]} as unknown as DocumentNode<PaginatedVehiclesQuery, PaginatedVehiclesQueryVariables>;
export const DropdownRolesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"DropdownRoles"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"listInputDto"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ListInputDTO"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"dropdownRoles"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"ListInputDTO"},"value":{"kind":"Variable","name":{"kind":"Name","value":"listInputDto"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"meta"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"totalItems"}},{"kind":"Field","name":{"kind":"Name","value":"totalPages"}},{"kind":"Field","name":{"kind":"Name","value":"currentPage"}},{"kind":"Field","name":{"kind":"Name","value":"limit"}}]}},{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"roleType"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"permissionCount"}},{"kind":"Field","name":{"kind":"Name","value":"organization"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}}]}}]}}]}}]} as unknown as DocumentNode<DropdownRolesQuery, DropdownRolesQueryVariables>;
export const GetPaginatedNotesByMeetingIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetPaginatedNotesByMeetingId"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"meetingId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"query"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ListInputDTO"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getPaginatedNotesByMeetingId"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"meetingId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"meetingId"}}},{"kind":"Argument","name":{"kind":"Name","value":"query"},"value":{"kind":"Variable","name":{"kind":"Name","value":"query"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"createdByUserId"}},{"kind":"Field","name":{"kind":"Name","value":"meetingId"}},{"kind":"Field","name":{"kind":"Name","value":"decision"}},{"kind":"Field","name":{"kind":"Name","value":"notes"}}]}}]}}]}}]} as unknown as DocumentNode<GetPaginatedNotesByMeetingIdQuery, GetPaginatedNotesByMeetingIdQueryVariables>;
export const GetPaginatedMeetingTaskByMeetingIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetPaginatedMeetingTaskByMeetingId"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"meetingId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"query"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ListInputDTO"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getPaginatedMeetingTaskByMeetingId"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"meetingId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"meetingId"}}},{"kind":"Argument","name":{"kind":"Name","value":"query"},"value":{"kind":"Variable","name":{"kind":"Name","value":"query"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"ownerId"}},{"kind":"Field","name":{"kind":"Name","value":"createdByUserId"}},{"kind":"Field","name":{"kind":"Name","value":"assigneeId"}},{"kind":"Field","name":{"kind":"Name","value":"meetingId"}},{"kind":"Field","name":{"kind":"Name","value":"notesId"}},{"kind":"Field","name":{"kind":"Name","value":"projectId"}},{"kind":"Field","name":{"kind":"Name","value":"parentTaskId"}},{"kind":"Field","name":{"kind":"Name","value":"ownerName"}},{"kind":"Field","name":{"kind":"Name","value":"assigneeName"}},{"kind":"Field","name":{"kind":"Name","value":"task"}},{"kind":"Field","name":{"kind":"Name","value":"projectName"}},{"kind":"Field","name":{"kind":"Name","value":"comment"}},{"kind":"Field","name":{"kind":"Name","value":"openedDate"}},{"kind":"Field","name":{"kind":"Name","value":"dueDate"}},{"kind":"Field","name":{"kind":"Name","value":"completedDate"}},{"kind":"Field","name":{"kind":"Name","value":"priority"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"completePercent"}},{"kind":"Field","name":{"kind":"Name","value":"totalTaskComplete"}},{"kind":"Field","name":{"kind":"Name","value":"weightType"}}]}}]}}]}}]} as unknown as DocumentNode<GetPaginatedMeetingTaskByMeetingIdQuery, GetPaginatedMeetingTaskByMeetingIdQueryVariables>;
export const PaginatedBreakdownsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"PaginatedBreakdowns"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"listInputDto"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ListInputDTO"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"paginatedBreakdowns"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"ListInputDTO"},"value":{"kind":"Variable","name":{"kind":"Name","value":"listInputDto"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"vehicleId"}},{"kind":"Field","name":{"kind":"Name","value":"vehicle"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"make"}},{"kind":"Field","name":{"kind":"Name","value":"model"}},{"kind":"Field","name":{"kind":"Name","value":"year"}},{"kind":"Field","name":{"kind":"Name","value":"color"}},{"kind":"Field","name":{"kind":"Name","value":"chassisNumber"}},{"kind":"Field","name":{"kind":"Name","value":"numberPlate"}},{"kind":"Field","name":{"kind":"Name","value":"maintenanceHistory"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"}},{"kind":"Field","name":{"kind":"Name","value":"insurance"}},{"kind":"Field","name":{"kind":"Name","value":"insuranceValidTill"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"latitude"}},{"kind":"Field","name":{"kind":"Name","value":"longitude"}},{"kind":"Field","name":{"kind":"Name","value":"createdById"}},{"kind":"Field","name":{"kind":"Name","value":"organizationId"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"deletedAt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"breakdownType"}},{"kind":"Field","name":{"kind":"Name","value":"breakdownDate"}},{"kind":"Field","name":{"kind":"Name","value":"breakdownDescription"}},{"kind":"Field","name":{"kind":"Name","value":"breakdownLocation"}},{"kind":"Field","name":{"kind":"Name","value":"latitude"}},{"kind":"Field","name":{"kind":"Name","value":"longitude"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"organizationId"}},{"kind":"Field","name":{"kind":"Name","value":"createdById"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]}}]} as unknown as DocumentNode<PaginatedBreakdownsQuery, PaginatedBreakdownsQueryVariables>;
export const ListTrashedMeetingDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ListTrashedMeeting"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"listInputDto"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ListInputDTO"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"listTrashedMeeting"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"ListInputDTO"},"value":{"kind":"Variable","name":{"kind":"Name","value":"listInputDto"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"meetingReference"}},{"kind":"Field","name":{"kind":"Name","value":"projectId"}},{"kind":"Field","name":{"kind":"Name","value":"createdByUserId"}},{"kind":"Field","name":{"kind":"Name","value":"meetingVenueId"}},{"kind":"Field","name":{"kind":"Name","value":"meetingTypeId"}},{"kind":"Field","name":{"kind":"Name","value":"projectName"}},{"kind":"Field","name":{"kind":"Name","value":"parentMeetingId"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"startTime"}},{"kind":"Field","name":{"kind":"Name","value":"endTime"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"meetingDate"}},{"kind":"Field","name":{"kind":"Name","value":"meetingAgenda"}},{"kind":"Field","name":{"kind":"Name","value":"meetingUrl"}}]}}]}}]}}]} as unknown as DocumentNode<ListTrashedMeetingQuery, ListTrashedMeetingQueryVariables>;
export const PaginatedActivityLogMeetingDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"PaginatedActivityLogMeeting"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"listInputDto"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ListInputDTO"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"paginatedActivityLogMeeting"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"ListInputDTO"},"value":{"kind":"Variable","name":{"kind":"Name","value":"listInputDto"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"createdByUserId"}},{"kind":"Field","name":{"kind":"Name","value":"module"}},{"kind":"Field","name":{"kind":"Name","value":"moduleId"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"activity"}},{"kind":"Field","name":{"kind":"Name","value":"ipAddress"}},{"kind":"Field","name":{"kind":"Name","value":"userAgent"}}]}}]}}]}}]} as unknown as DocumentNode<PaginatedActivityLogMeetingQuery, PaginatedActivityLogMeetingQueryVariables>;
export const ListTrashedFollowUpDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ListTrashedFollowUp"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"listInputDto"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ListInputDTO"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"listTrashedFollowUp"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"ListInputDto"},"value":{"kind":"Variable","name":{"kind":"Name","value":"listInputDto"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"followUpId"}},{"kind":"Field","name":{"kind":"Name","value":"subject"}},{"kind":"Field","name":{"kind":"Name","value":"body"}},{"kind":"Field","name":{"kind":"Name","value":"createdById"}}]}}]}}]}}]} as unknown as DocumentNode<ListTrashedFollowUpQuery, ListTrashedFollowUpQueryVariables>;
export const PaginatedFollowUpDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"PaginatedFollowUp"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"listInputDto"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ListInputDTO"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"paginatedFollowUp"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"ListInputDTO"},"value":{"kind":"Variable","name":{"kind":"Name","value":"listInputDto"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"followUpId"}},{"kind":"Field","name":{"kind":"Name","value":"subject"}},{"kind":"Field","name":{"kind":"Name","value":"body"}},{"kind":"Field","name":{"kind":"Name","value":"createdById"}}]}}]}}]}}]} as unknown as DocumentNode<PaginatedFollowUpQuery, PaginatedFollowUpQueryVariables>;
export const PaginatedMilestoneDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"PaginatedMilestone"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"listInputDto"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ListInputDTO"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"paginatedMilestone"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"ListInputDTO"},"value":{"kind":"Variable","name":{"kind":"Name","value":"listInputDto"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"projectId"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"startDate"}},{"kind":"Field","name":{"kind":"Name","value":"endDate"}},{"kind":"Field","name":{"kind":"Name","value":"projectName"}},{"kind":"Field","name":{"kind":"Name","value":"totalTaskCompleteMilestone"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}}]}}]}}]} as unknown as DocumentNode<PaginatedMilestoneQuery, PaginatedMilestoneQueryVariables>;