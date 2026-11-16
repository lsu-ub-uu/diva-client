/*
 * Copyright 2023 Uppsala University Library
 *
 * This file is part of DiVA Client.
 *
 *     DiVA Client is free software: you can redistribute it and/or modify
 *     it under the terms of the GNU General Public License as published by
 *     the Free Software Foundation, either version 3 of the License, or
 *     (at your option) any later version.
 *
 *     DiVA Client is distributed in the hope that it will be useful,
 *     but WITHOUT ANY WARRANTY; without even the implied warranty of
 *     MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *     GNU General Public License for more details.
 *
 *     You should have received a copy of the GNU General Public License
 */

import clsx from 'clsx';
import { createElement, type HTMLProps } from 'react';

export const ValueIcon = ({ className, ...rest }: HTMLProps<SVGSVGElement>) =>
  createElement(
    'svg',
    {
      xmlns: 'http://www.w3.org/2000/svg',
      width: '24',
      height: '24',
      viewBox: '0 0 24 24',
      fill: 'currentColor',
      stroke: 'currentColor',
      strokeWidth: '2',
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      className: clsx(
        'lucide lucide-circle-small-icon lucide-circle-small',
        className,
      ),
      ...rest,
    },
    createElement('circle', { cx: '12', cy: '12', r: '6' }),
  );

export { UnpublishFileIcon } from './UnpublishFileIcon';

export {
  ArchiveRestoreIcon as UntrashIcon,
  ArrowDownIcon,
  ArrowLeftRightIcon,
  ArrowUpIcon,
  BanIcon as ForbiddenIcon,
  BombIcon,
  BookCheckIcon as PublishIcon,
  BookDashedIcon as UnpublishIcon,
  BookOpenIcon as PublicationIcon,
  BracesIcon as JsonIcon,
  BugOffIcon,
  BuildingIcon as OrganisationIcon,
  ChartGanttIcon as ProjectIcon,
  CheckCircleIcon as SuccessIcon,
  CheckIcon,
  ChessKnightIcon,
  ChevronDownIcon,
  ChevronFirstIcon,
  ChevronLastIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronUpIcon,
  CircleDashedIcon as NoResultsIcon,
  CirclePlusIcon as AddIcon,
  CircleUserRoundIcon as UserIcon,
  CircleXIcon as ErrorIcon,
  CodeIcon as ApiIcon,
  CopyPlusIcon as CopyToNowIcon,
  CopyIcon,
  DownloadIcon,
  EllipsisIcon,
  EllipsisVerticalIcon,
  ExternalLinkIcon,
  FileExclamationPointIcon as ClassicQualityIcon,
  FileCheckIcon as PublishFileIcon,
  FilePenIcon as EditIcon,
  FilePlusIcon as CreateIcon,
  FileTextIcon as ViewIcon,
  FilterIcon,
  FlaskRoundIcon as SubjectIcon,
  FrownIcon as BadRequestIcon,
  FunnelIcon,
  FunnelXIcon,
  GlobeIcon as LanguageIcon,
  GraduationCapIcon as ProgrammeIcon,
  HandCoinsIcon as FunderIcon,
  HouseIcon as HomeIcon,
  InfoIcon,
  LibraryIcon as SeriesIcon,
  LinkIcon as RecordLinkIcon,
  LoaderCircleIcon,
  LockIcon as UnauthorizedIcon,
  LogInIcon,
  LogOutIcon,
  Maximize2Icon as ExpandIcon,
  MehIcon,
  MenuIcon,
  Minimize2Icon as CollapseIcon,
  MonitorCogIcon as MemberIcon,
  MoonIcon as DarkModeIcon,
  NewspaperIcon as JournalIcon,
  NotebookTabsIcon as CourseIcon,
  PaletteIcon as DesignSystemIcon,
  PanelsTopLeftIcon as ClientContentIcon,
  RefreshCwIcon as RefreshDependenciesIcon,
  SaveIcon,
  SearchIcon,
  SearchSlashIcon as NotFoundIcon,
  ServerCrashIcon as UnexpectedErrorIcon,
  ShoppingCartIcon as OrderLinkIcon,
  ShredderIcon as DeletePermanentlyIcon,
  SquareArrowRightExitIcon as LeaveIcon,
  SquirrelIcon,
  SunIcon as LightModeIcon,
  SwordsIcon as ConflictIcon,
  TagIcon as LabelIcon,
  TextSearchIcon as AutocompleteIcon,
  Trash2Icon as TrashIcon,
  TriangleAlertIcon as WarningIcon,
  UndoIcon,
  UnlinkIcon,
  UploadIcon,
  UsersIcon as PersonIcon,
  XIcon as CloseIcon,
  ScrollTextIcon as OldRecordIcon,
} from 'lucide-react';
