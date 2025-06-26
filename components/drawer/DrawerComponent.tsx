import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Image,
} from "react-native";
import { Avatar } from "tamagui";

interface drawerProps{
    profilePic : string,
    name : string,

}

export const DrawerComponent = ({profilePic,name}): React.ReactElement => {
  const [visible, setVisible] = React.useState(false);
  const [selectedTitle, setSelectedTitle] = React.useState("No items selected");

  const onUsersPress = (): void => {
    setSelectedTitle("Users");
    setVisible(false);
  };

  const onOrdersPress = (): void => {
    setSelectedTitle("Orders");
    setVisible(false);
  };

  const onTransactionsPress = (): void => {
    setSelectedTitle("Transactions");
    setVisible(false);
  };

  const renderToggleButton = (): React.ReactElement => (
    <TouchableOpacity onPress={() => setVisible(true)} style={styles.button}>
      <View style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        margin: 40,
      }}>
      <Avatar circular size="$10">
        <Avatar.Image
          accessibilityLabel="Cam"
          src="https://instagram.fcmb11-1.fna.fbcdn.net/v/t51.2885-19/454491793_1032767625100838_626386122557271768_n.jpg?_nc_ht=instagram.fcmb11-1.fna.fbcdn.net&_nc_cat=102&_nc_ohc=A7Q7U6l_I4gQ7kNvgHLTVDO&edm=APHcPcMBAAAA&ccb=7-5&oh=00_AYDDZiZQL5FVH5ui3s3Xkev54mwKEgCXthXcRch_YSrAFg&oe=66C56A90&_nc_sid=bef7bc"
          // src={profilePic}
        />
        <Avatar.Fallback backgroundColor="$blue10" />
      </Avatar>
      </View>
      <Text
        style={{
          fontSize: 20,
          fontWeight: "bold",
          color: "black",
          textAlign: "center",
          marginBottom: 10,
        }}
      >
        {/* {name} */}
        Damian Peiris.
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {renderToggleButton()}
      <Modal
        transparent={true}
        visible={visible}
        onRequestClose={() => setVisible(false)}
      >
        <TouchableOpacity
          style={styles.backdrop}
          onPress={() => setVisible(false)}
        >
          <View style={styles.menu}>
            <TouchableOpacity onPress={onUsersPress} style={styles.menuItem}>
              <Text>My Account</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={onOrdersPress} style={styles.menuItem}>
              <Text>Home</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={onTransactionsPress}
              style={styles.menuItem}
            >
              <Text>Watch Later</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={onTransactionsPress}
              style={styles.menuItem}
            >
              <Text>Favourties</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    minHeight: 150,
    padding: 10,
    justifyContent: "center",
    margin: 20,
  },
  title: {
    fontSize: 18,
    marginBottom: 20,
  },
  button: {
    padding: 10,
  },
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(1, 1, 1, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  menu: {
    width: 200,
    backgroundColor: "white",
    borderRadius: 5,
    padding: 10,
  },
  menuItem: {
    padding: 10,
  },
  hamburgerIcon: {
    width: 30,
    height: 30,
  },
});
