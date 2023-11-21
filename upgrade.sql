INSERT INTO `metablox`.`sys_cron_job` ( `group_id`, `name`, `func_name`, `func_param`, `pattern`, `policy`, `count`, `remark`, `status`, `created_at`, `updated_at`, `deleted_at`) VALUES ( 2, 'OpenRoaming Miner regularly receive bonuses', 'OpenRoamingBonus', '', '0 0 */4 * * *', 1, 0, '每隔4个小时OpenRoaming矿工获取一次收益', 1, '2023-08-25 09:42:23', '2023-08-30 07:22:03', NULL);

INSERT INTO `metablox`.`sys_cron_job` ( `group_id`, `name`, `func_name`, `func_param`, `pattern`, `policy`, `count`, `remark`, `status`, `created_at`, `updated_at`, `deleted_at`) VALUES ( 2, 'ShareWifi Miner regularly receive bonuses', 'ShareWifiBonus', '', '0 0 */4 * * *', 1, 0, '每隔4个小时ShareWifi矿工获取一次收益', 1, '2023-08-25 09:42:55', '2023-08-30 07:22:34', NULL);

INSERT INTO `metablox`.`sys_cron_job` ( `group_id`, `name`, `func_name`, `func_param`, `pattern`, `policy`, `count`, `remark`, `status`, `created_at`, `updated_at`, `deleted_at`) VALUES ( 2, 'Regularly update ShareWifi\'s health level', 'RefreshShareWifiHealth', '14,60,90', '0 0 0 * * *', 1, 0, '每天凌晨0点更新ShareWifi的健康度', 1, '2023-08-25 09:44:08', '2023-08-30 07:26:04', NULL);

INSERT INTO `metablox`.`sys_cron_job` ( `group_id`, `name`, `func_name`, `func_param`, `pattern`, `policy`, `count`, `remark`, `status`, `created_at`, `updated_at`, `deleted_at`) VALUES ( 2, 'Regularly update OpenRoaming\'s health level', 'RefreshOpenRoamingHealth', '', '0 0 */1 * * *', 1, 0, '每隔一小时更新OpenRoaming的健康度', 1, '2023-08-25 09:44:36', '2023-08-30 07:26:43', NULL);

INSERT INTO `metablox`.`sys_cron_job` ( `group_id`, `name`, `func_name`, `func_param`, `pattern`, `policy`, `count`, `remark`, `status`, `created_at`, `updated_at`, `deleted_at`) VALUES (2, 'Notify users every week to share and earn', 'NoticeShareToEarn', '', '0 0 9 * * 1', 1, 0, '每周一九点通知app用户ShareToEarn', 1, '2023-08-30 07:29:26', '2023-08-30 07:29:26', NULL);

INSERT INTO `metablox`.`sys_cron_job` ( `group_id`, `name`, `func_name`, `func_param`, `pattern`, `policy`, `count`, `remark`, `status`, `created_at`, `updated_at`, `deleted_at`) VALUES ( 2, 'Notify users to upgrade the app', 'NoticeNewVersionAvailable', 'V1.1.9', '0 */30 * * * *', 3, 0, '', 2, '2023-08-30 07:31:00', '2023-08-30 07:38:13', NULL);

INSERT INTO `metablox`.`sys_dict_data` ( `dict_type_id`, `code`, `name`, `sort`, `disabled`, `created_at`, `updated_at`, `deleted_at`, `remark`) VALUES (12, '1', 'Enabled', 1, 0, '2023-08-29 08:04:42', '2023-08-29 08:04:42', NULL, '');

INSERT INTO `metablox`.`sys_dict_data` ( `dict_type_id`, `code`, `name`, `sort`, `disabled`, `created_at`, `updated_at`, `deleted_at`, `remark`) VALUES ( 12, '2', 'Disabled', 2, 0, '2023-08-29 08:05:01', '2023-08-29 08:05:01', NULL, '');

INSERT INTO `metablox`.`sys_dict_data` ( `dict_type_id`, `code`, `name`, `sort`, `disabled`, `created_at`, `updated_at`, `deleted_at`, `remark`) VALUES ( 13, '1', 'Repeat', 1, 0, '2023-08-29 09:37:06', '2023-08-29 09:41:49', NULL, '');

INSERT INTO `metablox`.`sys_dict_data` ( `dict_type_id`, `code`, `name`, `sort`, `disabled`, `created_at`, `updated_at`, `deleted_at`, `remark`) VALUES ( 13, '2', 'Singleton', 2, 1, '2023-08-29 09:38:23', '2023-08-29 09:38:23', NULL, '');

INSERT INTO `metablox`.`sys_dict_data` (`dict_type_id`, `code`, `name`, `sort`, `disabled`, `created_at`, `updated_at`, `deleted_at`, `remark`) VALUES ( 13, '3', 'Exec Once', 3, 0, '2023-08-29 09:38:43', '2023-08-29 09:39:26', NULL, '');

INSERT INTO `metablox`.`sys_dict_data` ( `dict_type_id`, `code`, `name`, `sort`, `disabled`, `created_at`, `updated_at`, `deleted_at`, `remark`) VALUES ( 13, '4', 'Custom Times', 4, 1, '2023-08-29 09:39:12', '2023-08-29 09:39:12', NULL, '');

INSERT INTO `metablox`.`sys_dict_type` (`id`, `module`, `type`, `name`, `created_at`, `updated_at`, `deleted_at`, `disabled`, `remark`) VALUES (12, 'Admin', 'ADMIN.ENABLED_OR_DISABLED', 'admin enabled or disabled', '2023-08-29 08:04:00', '2023-08-29 08:04:00', NULL, 0, '');

INSERT INTO `metablox`.`sys_dict_type` (`id`, `module`, `type`, `name`, `created_at`, `updated_at`, `deleted_at`, `disabled`, `remark`) VALUES (13, 'Admin', 'ADMIN.SCHEDULED_TASKS_POLICY', 'admin  scheduled tasks policy', '2023-08-29 09:36:26', '2023-08-29 09:36:26', NULL, 0, '');

