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

export {
  ArchiveRestoreIcon,
  ArrowDownIcon,
  ArrowLeftRightIcon,
  ArrowUpIcon,
  BanIcon,
  BombIcon,
  BookCheckIcon,
  BookDashedIcon,
  BookOpenIcon,
  BracesIcon,
  BugOffIcon,
  BuildingIcon,
  ChartGanttIcon,
  CheckCircleIcon,
  CheckIcon,
  ChessKnightIcon,
  ChevronDownIcon,
  ChevronFirstIcon,
  ChevronLastIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronUpIcon,
  CircleCheckBigIcon,
  CircleDashedIcon,
  CirclePlusIcon,
  CircleUserRoundIcon,
  CircleXIcon,
  CodeIcon,
  CodeXmlIcon,
  CopyIcon,
  DownloadIcon,
  EllipsisIcon,
  ExternalLinkIcon,
  FileExclamationPointIcon,
  FilePenIcon,
  FilePlusIcon,
  FileTextIcon,
  FilterIcon,
  FlaskRoundIcon,
  FrownIcon,
  FunnelIcon,
  FunnelXIcon,
  GlobeIcon,
  GraduationCapIcon,
  HandCoinsIcon,
  HouseIcon,
  InfoIcon,
  LibraryIcon,
  LinkIcon,
  LoaderCircleIcon,
  LockIcon,
  LogInIcon,
  LogOutIcon,
  Maximize2Icon,
  MehIcon,
  MenuIcon,
  Minimize2Icon,
  MonitorCogIcon,
  MoonIcon,
  NewspaperIcon,
  NotebookTabsIcon,
  PaletteIcon,
  PanelsTopLeftIcon,
  PlusCircleIcon,
  RefreshCwIcon,
  SaveIcon,
  SearchIcon,
  SearchSlashIcon,
  ServerCrashIcon,
  ShoppingCartIcon,
  ShredderIcon,
  SquareArrowRightExitIcon,
  SquirrelIcon,
  SunIcon,
  SwordsIcon,
  TagIcon,
  TextSearchIcon,
  Trash2Icon,
  TriangleAlertIcon,
  UndoIcon,
  UploadIcon,
  UsersIcon,
  XIcon,
} from 'lucide-react';
